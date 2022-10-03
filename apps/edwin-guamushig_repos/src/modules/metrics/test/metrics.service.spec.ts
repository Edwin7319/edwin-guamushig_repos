import { Test, TestingModule } from '@nestjs/testing';
import { getRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { MetricsService } from '../metrics.service';
import { MetricsController } from '../metrics.controller';
import { TestUtil } from '../../../utils/test.util';
import { MetricsEntity } from '../entity/metrics.entity';
import { MetricsCreateDto } from '../dto/metrics-create.dto';
import { DATA } from '../fixture/test-data';

describe('MetricsService', () => {
  let service: MetricsService;
  let module: TestingModule;
  let metricsRepository: Repository<MetricsEntity>;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule],
      controllers: [MetricsController],
      providers: [MetricsService],
      exports: [MetricsService],
    }).compile();

    await TestUtil.setup(DATA);
    service = module.get<MetricsService>(MetricsService);
    metricsRepository = getRepository(MetricsEntity);
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
    it('should create a new metric', async () => {
      const newRepository: MetricsCreateDto = {
        repository: {
          id: 1,
        },
        bugs: 3,
        codeSmells: 2,
        vulnerabilities: 1,
        coverage: 44.33,
        hotspot: 1,
      };
      const repository = await service.create({
        ...newRepository,
      });

      expect(repository).toMatchObject({
        ...newRepository,
        repositoryId: 1,
      });
    });

    it('should throw an error exception if there is a problem creating a new metric', async () => {
      jest.spyOn(metricsRepository, 'save').mockImplementation(() => {
        throw new Error();
      });

      await expect(
        service.create({
          bugs: 3,
          codeSmells: 2,
          vulnerabilities: 1,
          coverage: 44.33,
          hotspot: 1,
        } as MetricsCreateDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('when update method is called', () => {
    it('should update an tribe', async () => {
      const ID = 1;

      const originalRepo = await metricsRepository.findOne(ID);
      expect(originalRepo).toMatchObject({
        id: 1,
        coverage: 22.33,
        codeSmells: 3,
        hotspot: 4,
      });

      const updatedRepo = await service.update(ID, {
        coverage: 33.33,
        codeSmells: 5,
        hotspot: 1,
      });

      console.log(updatedRepo);

      expect(updatedRepo).toMatchObject({
        id: 1,
        coverage: 33.33,
        codeSmells: 5,
        hotspot: 1,
      });
    });

    it('should throw an internal exception if there is a problem updating a metric', async () => {
      jest.spyOn(metricsRepository, 'save').mockImplementation(() => {
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
          coverage: 44.33,
          bugs: 3,
          vulnerabilities: 1,
          hotspot: 1,
          codeSmells: 2,
          repositoryId: 1,
        },
        {
          id: 2,
          coverage: 55.69,
          bugs: 2,
          vulnerabilities: 2,
          hotspot: 9,
          codeSmells: 2,
          repositoryId: 2,
        },
        {
          id: 1,
          coverage: 33.33,
          bugs: 1,
          vulnerabilities: 2,
          hotspot: 1,
          codeSmells: 5,
          repositoryId: 1,
        },
      ]);
      expect(repositories[1]).toBe(3);
    });

    it('should throw an internal exception if there is a problem', async () => {
      jest.spyOn(metricsRepository, 'findAndCount').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('when findById method is called', () => {
    it('should return a metric', async () => {
      const ID = 2;
      const metric = await service.findById(ID);

      expect(metric).toMatchObject({
        id: 2,
        coverage: 55.69,
        bugs: 2,
        vulnerabilities: 2,
        codeSmells: 2,
        hotspot: 9,
      });
    });
    it('should return undefined if register not exist', async () => {
      expect(await service.findById(200)).toBeUndefined();
    });
    it('should throw an internal exception if there is a problem', async () => {
      jest.spyOn(metricsRepository, 'findOne').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.findById(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('when delete method is called', () => {
    it('should delete a metric', async () => {
      const ID = 1;

      const originalMetric = await metricsRepository.findOne(ID);
      expect(originalMetric).toMatchObject({
        id: ID,
      });

      await service.delete(ID);

      expect(await metricsRepository.findOne(ID)).toBeUndefined();
    });

    it('should throw a not found exception if register not exist', async () => {
      await expect(service.delete(99)).rejects.toThrow(NotFoundException);
    });

    it('should throw an internal exception if there is a problem deleting a repository', async () => {
      jest.spyOn(metricsRepository, 'delete').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.delete(2)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
