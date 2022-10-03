import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

import { SimulatedService } from './simulated.service';
import configuration from '../../config/configuration';

describe('SimulatedServiceService', () => {
  let service: SimulatedService;
  let httpService: HttpService;
  let configService: ConfigService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot({ load: [configuration] })],
      providers: [SimulatedService],
    }).compile();

    service = module.get<SimulatedService>(SimulatedService);
    configService = module.get<ConfigService>(ConfigService);
    httpService = module.get<HttpService>(HttpService);
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

  describe('when getRepositories method is called', () => {
    const repositoryResponse = {
      data: {
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
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    it('should return an array of repositories', async () => {
      const TEST_URL = 'https://test-url.com/repositories';
      const mockGet = jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(repositoryResponse));
      jest.spyOn(configService, 'get').mockImplementation(() => TEST_URL);

      const repositories = await service.getRepositories();

      expect(repositories).toEqual(repositoryResponse.data);
      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(TEST_URL);
    });

    it('should return a bad request exception', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        throw new Error();
      });

      await expect(service.getRepositories()).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
