import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';

import { OrganizationService } from '../organization.service';
import { TestUtil } from '../../../utils/test.util';
import { OrganizationController } from '../organization.controller';
import { DATA } from '../fixture/test-data';
import { OrganizationCreateDto } from '../dto/organization-create.dto';
import { OrganizationEntity } from '../entity/organization.entity';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let module: TestingModule;
  let organizationRepository: Repository<OrganizationEntity>;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule],
      providers: [OrganizationService],
      controllers: [OrganizationController],
      exports: [OrganizationService],
    }).compile();

    await TestUtil.setup(DATA);
    service = module.get<OrganizationService>(OrganizationService);
    organizationRepository = getRepository(OrganizationEntity);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('when create method is called', () => {
    it('should create a new organization', async () => {
      const newOrganization = {
        name: 'new organization xx',
        status: 69,
      };
      const organization = await service.create({
        ...newOrganization,
      });

      expect(organization).toMatchObject({
        ...newOrganization,
      });
    });

    it('should throw an error exception if there is a problem creating a new organization', async () => {
      jest.spyOn(organizationRepository, 'save').mockImplementation(() => {
        throw new Error();
      });

      await expect(
        service.create({
          name: 'test',
          status: 2,
        } as OrganizationCreateDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('when update method is called', () => {
    it('should update an organization', async () => {
      const ID = 2;

      const originalOrganization = await organizationRepository.findOne(ID);
      expect(originalOrganization).toMatchObject({
        name: 'Organization 2',
      });

      const updatedOrganization = await service.update(ID, {
        name: 'Organization 2 updated',
      });

      expect(updatedOrganization).toMatchObject({
        id: 2,
        name: 'Organization 2 updated',
        status: 1,
      });
    });

    it('should throw an internal exception if there is a problem updating an organization', async () => {
      jest.spyOn(organizationRepository, 'save').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.update(1, {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should throw a not found exception if register not exist', async () => {
      await expect(service.update(99, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('when findAll method is called', () => {
    it('should return an array, in the first position the list of organizations and in the second a counter', async () => {
      const organizations = await service.findAll();

      expect(organizations[0]).toMatchObject([
        {
          id: 1,
          name: 'Organization 1',
          status: 1,
        },
        {
          id: 3,
          name: 'new organization xx',
          status: 69,
        },
        {
          id: 2,
          name: 'Organization 2 updated',
          status: 1,
        },
      ]);
      expect(organizations[1]).toBe(3);
    });

    it('should throw an internal exception if there is a problem', async () => {
      jest
        .spyOn(organizationRepository, 'findAndCount')
        .mockImplementation(() => {
          throw new Error();
        });

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('when findById method is called', () => {
    it('should return an organization', async () => {
      const ID = 2;
      const organization = await service.findById(ID);

      expect(organization).toMatchObject({
        id: 2,
        name: 'Organization 2 updated',
        status: 1,
      });
    });
    it('should return undefined if register not exist', async () => {
      expect(await service.findById(99)).toBeUndefined();
    });
    it('should throw an internal exception if there is a problem', async () => {
      jest.spyOn(organizationRepository, 'findOne').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.findById(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('when delete method is called', () => {
    it('should delete an organization', async () => {
      const ID = 1;

      const originalOrganization = await organizationRepository.findOne(ID);
      expect(originalOrganization).toMatchObject({
        id: ID,
      });

      await service.delete(ID);

      expect(await organizationRepository.findOne(ID)).toBeUndefined();
    });

    it('should throw a not found exception if register not exist', async () => {
      await expect(service.delete(99)).rejects.toThrow(NotFoundException);
    });

    it('should throw an internal exception if there is a problem deleting an organization', async () => {
      jest.spyOn(organizationRepository, 'delete').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.delete(2)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
