import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigService } from '@nestjs/config';

import { MetricsController } from '../metrics.controller';
import { TestUtil } from '../../../utils/test.util';
import { MetricsService } from '../metrics.service';
import { MetricsCreateDto } from '../dto/metrics-create.dto';
import { DATA } from '../fixture/test-data';
import { MetricsEntity } from '../entity/metrics.entity';
import { MetricsUpdateDto } from '../dto/metrics-update.dto';
import { SimulatedModule } from '../../../gateway/simulated/simulated.module';

describe('MetricsController', () => {
  let controller: MetricsController;
  let module: TestingModule;
  let metricsService: MetricsService;
  let httpServer;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule, SimulatedModule],
      controllers: [MetricsController],
      providers: [MetricsService, ConfigService],
      exports: [MetricsService],
    }).compile();

    await TestUtil.setup(DATA);

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    httpServer = app.getHttpServer();

    controller = module.get<MetricsController>(MetricsController);
    metricsService = module.get<MetricsService>(MetricsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when create controller is called', () => {
    it('should return a new metric', async () => {
      const metric: MetricsCreateDto = {
        coverage: 93,
        hotspot: 2,
        bugs: 4,
        codeSmells: 49,
        vulnerabilities: 87,
        repository: {
          id: 1,
        },
      };

      const mockCreate = jest
        .spyOn(metricsService, 'create')
        .mockImplementation(() =>
          Promise.resolve({
            id: 1,
            ...metric,
            createdAt: new Date('2021-02-01T00:00:00.000Z'),
            updatedAt: new Date('2021-02-01T00:00:00.000Z'),
          } as MetricsEntity),
        );

      const response = await request(httpServer)
        .post('/metrics')
        .send(metric)
        .expect(201);

      expect(response.body).toMatchObject({ ...metric });
      expect(mockCreate).toHaveBeenCalledWith({ ...metric });
    });
    it('should return errors with description of the required fields', async () => {
      const mockCreateService = jest.spyOn(metricsService, 'create');

      const response = await request(httpServer)
        .post('/metrics')
        .send({})
        .expect(400);

      expect(response.body).toMatchObject({
        message: [
          'coverage must be a number conforming to the specified constraints',
          'coverage should not be empty',
          'bugs must be an integer number',
          'bugs should not be empty',
          'vulnerabilities must be an integer number',
          'vulnerabilities should not be empty',
          'hotspot must be an integer number',
          'hotspot should not be empty',
          'codeSmells must be an integer number',
          'codeSmells should not be empty',
          'repository should not be empty',
        ],
        error: 'Bad Request',
      });

      expect(mockCreateService).not.toHaveBeenCalled();
    });
  });

  describe('when update controller is called', () => {
    it('should return the metric updated', async () => {
      const metric: MetricsUpdateDto = {
        coverage: 22,
        vulnerabilities: 44,
      };

      const mockCreate = jest
        .spyOn(metricsService, 'update')
        .mockImplementation(() =>
          Promise.resolve({
            id: 2,
            ...metric,
            createdAt: new Date('2021-02-01T00:00:00.000Z'),
            updatedAt: new Date('2021-02-01T00:00:00.000Z'),
          } as MetricsEntity),
        );

      const response = await request(httpServer)
        .put('/metrics/1')
        .send(metric)
        .expect(200);

      expect(response.body).toMatchObject({
        id: 2,
        ...metric,
      });
      expect(mockCreate).toHaveBeenCalledWith(1, { ...metric });
    });

    it('should return errors with problem fields', async () => {
      const mockUpdateService = jest.spyOn(metricsService, 'update');

      const response = await request(httpServer)
        .put('/metrics/2')
        .send({ coverage: '22.33' })
        .expect(400);

      expect(response.body).toMatchObject({
        message: [
          'coverage must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
      });

      expect(mockUpdateService).not.toHaveBeenCalled();
    });
  });
});
