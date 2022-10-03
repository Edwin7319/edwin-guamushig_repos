import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from '../organization.service';
import { TestUtil } from '../../../utils/test.util';
import { OrganizationController } from '../organization.controller';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let module: TestingModule;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      imports: [...typeOrmModule],
      providers: [OrganizationService],
      controllers: [OrganizationController],
      exports: [OrganizationService],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
