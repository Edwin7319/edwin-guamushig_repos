import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';

import { TribeService } from '../tribe.service';
import { TestUtil } from '../../../utils/test.util';
import { TribeController } from '../tribe.controller';
import { DATA } from '../fixture/test-data';
import { TribeEntity } from '../entity/tribe.entity';
import { TribeCreateDto } from '../dto/tribe-create.dto';

describe('TribeService', () => {
  let service: TribeService;
  let module: TestingModule;
  let tribeRepository: Repository<TribeEntity>;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule],
      providers: [TribeService],
      controllers: [TribeController],
      exports: [TribeService],
    }).compile();

    await TestUtil.setup(DATA);
    service = module.get<TribeService>(TribeService);
    tribeRepository = getRepository(TribeEntity);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create method is called', () => {
    it('should create a new tribe', async () => {
      const newTribe = {
        name: 'new tribe',
        status: 69,
        organization: {
          id: 1,
        },
      };
      const tribe = await service.create({
        ...newTribe,
      });

      expect(tribe).toMatchObject({
        ...newTribe,
        organizationId: 1,
      });
    });

    it('should throw an error exception if there is a problem creating a new tribe', async () => {
      jest.spyOn(tribeRepository, 'save').mockImplementation(() => {
        throw new Error();
      });

      await expect(
        service.create({
          name: 'test',
          status: 2,
        } as TribeCreateDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('when update method is called', () => {
    it('should update an tribe', async () => {
      const ID = 2;

      const originalTribe = await tribeRepository.findOne(ID);
      expect(originalTribe).toMatchObject({
        name: 'Tribe 2',
      });

      const updatedTribe = await service.update(ID, {
        name: 'Tribe 2 updated',
      });

      expect(updatedTribe).toMatchObject({
        id: 2,
        name: 'Tribe 2 updated',
        status: 1,
      });
    });

    it('should throw an internal exception if there is a problem updating an tribe', async () => {
      jest
        .spyOn(tribeRepository, 'createQueryBuilder')
        .mockImplementation(() => {
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
    it('should return an array, in the first position the list of tribes and in the second a counter', async () => {
      const tribes = await service.findAll();

      console.log(JSON.stringify(tribes, null, 2));
      expect(tribes[0]).toMatchObject([
        {
          id: 1,
          name: 'Tribe 1',
          status: 1,
          organizationId: 1,
        },
        {
          id: 3,
          name: 'new tribe',
          status: 69,
          organizationId: 1,
        },
        {
          id: 2,
          name: 'Tribe 2 updated',
          status: 1,
          organizationId: 2,
        },
      ]);
      expect(tribes[1]).toBe(3);
    });

    it('should throw an internal exception if there is a problem', async () => {
      jest.spyOn(tribeRepository, 'findAndCount').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('when findById method is called', () => {
    it('should return a tribe', async () => {
      const ID = 2;
      const tribe = await service.findById(ID);

      expect(tribe).toMatchObject({
        id: 2,
        name: 'Tribe 2 updated',
        status: 1,
      });
    });
    it('should return undefined if register not exist', async () => {
      expect(await service.findById(99)).toBeUndefined();
    });
    it('should throw an internal exception if there is a problem', async () => {
      jest.spyOn(tribeRepository, 'findOne').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.findById(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('when delete method is called', () => {
    it('should delete an tribe', async () => {
      const ID = 1;

      const originalTribe = await tribeRepository.findOne(ID);
      expect(originalTribe).toMatchObject({
        id: ID,
      });

      await service.delete(ID);

      expect(await tribeRepository.findOne(ID)).toBeUndefined();
    });

    it('should throw a not found exception if register not exist', async () => {
      await expect(service.delete(99)).rejects.toThrow(NotFoundException);
    });

    it('should throw an internal exception if there is a problem deleting an tribe', async () => {
      jest.spyOn(tribeRepository, 'delete').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.delete(2)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
