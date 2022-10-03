import { Test, TestingModule } from '@nestjs/testing';
import { getRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { RepositoryService } from '../repository.service';
import { RepositoryController } from '../repository.controller';
import { TestUtil } from '../../../utils/test.util';
import { RepositoryEntity } from '../entity/repository.entity';

import { RepositoryCreateDto } from '../dto/repository-create.dto';
import { DATA } from '../fixtures/test-data';
import {
  RepositoryStateEnum,
  RepositoryStatusEnum,
} from '../enum/repository.enum';

describe('RepositoryService', () => {
  let service: RepositoryService;
  let module: TestingModule;
  let repoRepository: Repository<RepositoryEntity>;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule],
      providers: [RepositoryService],
      controllers: [RepositoryController],
      exports: [RepositoryService],
    }).compile();

    await TestUtil.setup(DATA);
    service = module.get<RepositoryService>(RepositoryService);
    repoRepository = getRepository(RepositoryEntity);
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
    it('should create a new repository', async () => {
      const newRepository = {
        name: 'new repo',
        state: RepositoryStateEnum.ENABLE,
        status: RepositoryStatusEnum.ACTIVE,
        tribe: {
          id: 1,
        },
      };
      const repository = await service.create({
        ...newRepository,
      });

      expect(repository).toMatchObject({
        ...newRepository,
        tribeId: 1,
      });
    });

    it('should throw an error exception if there is a problem creating a new repository', async () => {
      jest.spyOn(repoRepository, 'save').mockImplementation(() => {
        throw new Error();
      });

      await expect(
        service.create({
          name: 'test',
          status: RepositoryStatusEnum.ACTIVE,
        } as RepositoryCreateDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('when update method is called', () => {
    it('should update an tribe', async () => {
      const ID = 1;

      const originalRepo = await repoRepository.findOne(ID);
      expect(originalRepo).toMatchObject({
        name: 'Repository 1',
        state: RepositoryStateEnum.ENABLE,
        status: RepositoryStatusEnum.ACTIVE,
      });

      const updatedRepo = await service.update(ID, {
        name: 'Repo 1 updated',
        state: RepositoryStateEnum.ARCHIVE,
      });

      expect(updatedRepo).toMatchObject({
        id: 1,
        name: 'Repo 1 updated',
        state: RepositoryStateEnum.ARCHIVE,
        status: RepositoryStatusEnum.ACTIVE,
      });
    });

    it('should throw an internal exception if there is a problem updating a repository', async () => {
      jest
        .spyOn(repoRepository, 'createQueryBuilder')
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
      const repositories = await service.findAll();

      expect(repositories[0]).toMatchObject([
        {
          id: 3,
          name: 'new repo',
          state: RepositoryStateEnum.ENABLE,
          status: RepositoryStatusEnum.ACTIVE,
          tribeId: 1,
        },
        {
          id: 2,
          name: 'Repository 2',
          state: RepositoryStateEnum.ARCHIVE,
          status: RepositoryStatusEnum.ACTIVE,
          tribeId: 2,
        },
        {
          id: 1,
          name: 'Repo 1 updated',
          state: RepositoryStateEnum.ARCHIVE,
          status: RepositoryStatusEnum.ACTIVE,
          tribeId: 2,
        },
      ]);
      expect(repositories[1]).toBe(3);
    });

    it('should throw an internal exception if there is a problem', async () => {
      jest.spyOn(repoRepository, 'findAndCount').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('when findById method is called', () => {
    it('should return a repository', async () => {
      const ID = 2;
      const repository = await service.findById(ID);

      expect(repository).toMatchObject({
        id: 2,
        name: 'Repository 2',
        state: RepositoryStateEnum.ARCHIVE,
        status: RepositoryStatusEnum.ACTIVE,
        tribeId: 2,
      });
    });
    it('should return undefined if register not exist', async () => {
      expect(await service.findById(99)).toBeUndefined();
    });
    it('should throw an internal exception if there is a problem', async () => {
      jest.spyOn(repoRepository, 'findOne').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.findById(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('when delete method is called', () => {
    it('should delete a repository', async () => {
      const ID = 1;

      const originalRepo = await repoRepository.findOne(ID);
      expect(originalRepo).toMatchObject({
        id: ID,
      });

      await service.delete(ID);

      expect(await repoRepository.findOne(ID)).toBeUndefined();
    });

    it('should throw a not found exception if register not exist', async () => {
      await expect(service.delete(99)).rejects.toThrow(NotFoundException);
    });

    it('should throw an internal exception if there is a problem deleting a repository', async () => {
      jest.spyOn(repoRepository, 'delete').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.delete(2)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
