import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from '../organization.controller';
import { testingTypeOrmModuleImports } from '../../../utils/test.util';
import { OrganizationService } from '../organization.service';

describe('OrganizationController', () => {
  let controller: OrganizationController;
  let module: TestingModule;

  beforeEach(async () => {
    const testingModule = await testingTypeOrmModuleImports();
    module = await Test.createTestingModule({
      controllers: [OrganizationController],
      imports: [...testingModule],
      providers: [OrganizationService],
      exports: [OrganizationService],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
