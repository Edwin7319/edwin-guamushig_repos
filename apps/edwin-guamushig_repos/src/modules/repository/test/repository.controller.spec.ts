import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { RepositoryController } from '../repository.controller';
import { RepositoryService } from '../repository.service';
import { TestUtil } from '../../../utils/test.util';

describe('RepositoryController', () => {
  let controller: RepositoryController;
  let module: TestingModule;
  let repoService: RepositoryService;
  let httpServer;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule],
      providers: [RepositoryService],
      controllers: [RepositoryController],
      exports: [RepositoryService],
    }).compile();

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    httpServer = app.getHttpServer();

    controller = module.get<RepositoryController>(RepositoryController);
    repoService = module.get<RepositoryService>(RepositoryService);
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
      const mockCreateService = jest.spyOn(repoService, 'create');

      const response = await request(httpServer)
        .post('/repository')
        .send({})
        .expect(400);

      expect(response.body).toMatchObject({
        message: [
          'name must be a string',
          'name should not be empty',
          'status must be one of the following values: A, I',
          'status should not be empty',
          'state must be one of the following values: A, E, D',
          'state should not be empty',
          'tribe should not be empty',
        ],
        error: 'Bad Request',
      });

      expect(mockCreateService).not.toHaveBeenCalled();
    });
  });

  describe('when update controller is called', () => {
    it('should return errors with problem fields', async () => {
      const mockUpdateService = jest.spyOn(repoService, 'update');

      const response = await request(httpServer)
        .put('/repository/2')
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
