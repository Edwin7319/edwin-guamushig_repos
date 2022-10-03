import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';

import { TribeController } from '../tribe.controller';
import { TestUtil } from '../../../utils/test.util';
import { TribeService } from '../tribe.service';
import * as request from 'supertest';

describe('TribeController', () => {
  let controller: TribeController;
  let module: TestingModule;
  let tribeService: TribeService;
  let httpServer;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule],
      providers: [TribeService],
      controllers: [TribeController],
      exports: [TribeService],
    }).compile();

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    httpServer = app.getHttpServer();

    controller = module.get<TribeController>(TribeController);
    tribeService = module.get<TribeService>(TribeService);
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
      const mockCreateService = jest.spyOn(tribeService, 'create');

      const response = await request(httpServer)
        .post('/tribe')
        .send({})
        .expect(400);

      expect(response.body).toMatchObject({
        message: [
          'name must be a string',
          'name should not be empty',
          'status must be an integer number',
          'status should not be empty',
          'organization should not be empty',
        ],
        error: 'Bad Request',
      });

      expect(mockCreateService).not.toHaveBeenCalled();
    });
  });

  describe('when update controller is called', () => {
    it('should return errors with problem fields', async () => {
      const mockUpdateService = jest.spyOn(tribeService, 'update');

      const response = await request(httpServer)
        .put('/tribe/2')
        .send({ name: 222 })
        .expect(400);

      expect(response.body).toMatchObject({
        message: ['name must be a string'],
        error: 'Bad Request',
      });

      expect(mockUpdateService).not.toHaveBeenCalled();
    });
  });
});
