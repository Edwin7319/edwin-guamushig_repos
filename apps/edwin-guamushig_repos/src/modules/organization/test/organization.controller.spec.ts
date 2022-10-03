import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { OrganizationController } from '../organization.controller';
import { TestUtil } from '../../../utils/test.util';
import { OrganizationService } from '../organization.service';
import { OrganizationCreateDto } from '../dto/organization-create.dto';
import { OrganizationEntity } from '../entity/organization.entity';
import { OrganizationUpdateDto } from '../dto/organization-update.dto';

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
    it('should return a new organization', async () => {
      const testData: OrganizationCreateDto = {
        name: 'name',
        status: 22,
      };

      const mockCreate = jest
        .spyOn(organizationService, 'create')
        .mockImplementation(() =>
          Promise.resolve({
            id: 1,
            ...testData,
            createdAt: new Date('2021-02-01T00:00:00.000Z'),
            updatedAt: new Date('2021-02-01T00:00:00.000Z'),
          } as OrganizationEntity),
        );

      const response = await request(httpServer)
        .post('/organization')
        .send(testData)
        .expect(201);

      expect(response.body).toMatchObject({ ...testData });
      expect(mockCreate).toHaveBeenCalledWith({ ...testData });
    });

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
    it('should return the organization updated', async () => {
      const testData: OrganizationUpdateDto = {
        name: 'updated',
      };

      const mockCreate = jest
        .spyOn(organizationService, 'update')
        .mockImplementation(() =>
          Promise.resolve({
            id: 2,
            ...testData,
            createdAt: new Date('2021-02-01T00:00:00.000Z'),
            updatedAt: new Date('2021-02-01T00:00:00.000Z'),
          } as OrganizationEntity),
        );

      const response = await request(httpServer)
        .put('/organization/1')
        .send(testData)
        .expect(200);

      expect(response.body).toMatchObject({
        id: 2,
        ...testData,
      });
      expect(mockCreate).toHaveBeenCalledWith(1, { ...testData });
    });

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
