import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { OrganizationController } from '../organization.controller';
import { TestUtil } from '../../../utils/test.util';
import { OrganizationService } from '../organization.service';

describe('OrganizationController', () => {
  let controller: OrganizationController;
  let module: TestingModule;
  let organizationService: OrganizationService;
  let httpServer;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      controllers: [OrganizationController],
      imports: [...typeOrmModule],
      providers: [OrganizationService],
      exports: [OrganizationService],
    }).compile();

    const app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    httpServer = app.getHttpServer();

    controller = module.get<OrganizationController>(OrganizationController);
    organizationService = module.get<OrganizationService>(OrganizationService);
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
      const mockCreateService = jest.spyOn(organizationService, 'create');

      const response = await request(httpServer)
        .post('/organization')
        .send({})
        .expect(400);

      expect(response.body).toMatchObject({
        message: [
          'name must be a string',
          'name should not be empty',
          'status must be an integer number',
          'status should not be empty',
        ],
        error: 'Bad Request',
      });

      expect(mockCreateService).not.toHaveBeenCalled();
    });
  });

  describe('when update controller is called', () => {
    it('should return errors with problem fields', async () => {
      const mockUpdateService = jest.spyOn(organizationService, 'update');

      const response = await request(httpServer)
        .put('/organization/1')
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
