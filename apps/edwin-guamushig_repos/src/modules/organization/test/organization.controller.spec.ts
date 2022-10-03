import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from '../organization.controller';
import { TestUtil } from '../../../utils/test.util';
import { OrganizationService } from '../organization.service';

describe('OrganizationController', () => {
  let controller: OrganizationController;
  let module: TestingModule;

  beforeAll(async () => {
    const typeOrmModule = await TestUtil.testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      controllers: [OrganizationController],
      imports: [...typeOrmModule],
      providers: [OrganizationService],
      exports: [OrganizationService],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
