import { Test, TestingModule } from '@nestjs/testing';
import { getRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MetricsService } from '../metrics.service';
import { MetricsController } from '../metrics.controller';
import { TestUtil } from '../../../utils/test.util';
import { MetricsEntity } from '../entity/metrics.entity';
import { MetricsCreateDto } from '../dto/metrics-create.dto';
import { DATA } from '../fixture/test-data';
import { SimulatedModule } from '../../../gateway/simulated/simulated.module';
import { SimulatedService } from '../../../gateway/simulated/simulated.service';

describe('MetricsService', () => {
  let service: MetricsService;
  let simulateService: SimulatedService;
  let module: TestingModule;
  let metricsRepository: Repository<MetricsEntity>;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule, SimulatedModule],
      controllers: [MetricsController],
      providers: [MetricsService, ConfigService],
      exports: [MetricsService],
    }).compile();

    await TestUtil.setup(DATA);
    service = module.get<MetricsService>(MetricsService);
    simulateService = module.get<SimulatedService>(SimulatedService);
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
          id: 4,
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
          id: 3,
          coverage: 88.88,
          bugs: 2,
          vulnerabilities: 2,
          hotspot: 9,
          codeSmells: 2,
          repositoryId: 3,
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
      expect(repositories[1]).toBe(4);
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

  describe('when checkIfTribeExists method is called', () => {
    it('should return true if tribe exists', async () => {
      expect(await service.checkIfTribeExists(1)).toBe(true);
    });
    it('should return an exception if not exist', async () => {
      await expect(service.checkIfTribeExists(22)).rejects.toThrow(
        new NotFoundException('La tribu no se encuentra registrada'),
      );
    });
  });

  describe('when getRepositoryMetrics method is called', () => {
    it('should return an array with the metrics of the repository', async () => {
      jest.spyOn(simulateService, 'getRepositories').mockImplementation(() =>
        Promise.resolve({
          repositories: [
            {
              id: 1,
              state: 604,
            },
            {
              id: 2,
              state: 605,
            },
            {
              id: 3,
              state: 606,
            },
          ],
        }),
      );

      const metrics = await service.getRepositoryMetrics(3);

      expect(metrics).toMatchObject({
        repositories: [
          {
            id: '3',
            name: 'Repository 33',
            tribe: 'Tribe 3',
            organization: 'Organization 2',
            coverage: '88.88%',
            codeSmells: 2,
            bugs: 2,
            vulnerabilities: 2,
            hotspots: 9,
            verificationState: 'Aprobado',
            state: 'Habilitado',
          },
        ],
      });
    });

    it('should return an exception if there is no repository with more than 75% coverage', async () => {
      jest.spyOn(simulateService, 'getRepositories').mockImplementation(() =>
        Promise.resolve({
          repositories: [
            {
              id: 1,
              state: 604,
            },
            {
              id: 2,
              state: 605,
            },
            {
              id: 3,
              state: 606,
            },
          ],
        }),
      );

      await expect(service.getRepositoryMetrics(1)).rejects.toThrow(
        new NotFoundException(
          'La tribu no tiene repositorios que cumplan con la cobertura necesaria',
        ),
      );
    });
  });
});
