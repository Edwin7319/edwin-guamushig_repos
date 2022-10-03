import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { MetricsController } from '../metrics.controller';
import { TestUtil } from '../../../utils/test.util';
import { MetricsService } from '../metrics.service';

describe('MetricsController', () => {
  let controller: MetricsController;
  let module: TestingModule;
  let metricsService: MetricsService;
  let httpServer;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule],
      providers: [MetricsService],
      controllers: [MetricsController],
      exports: [MetricsService],
    }).compile();

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
