import { Test, TestingModule } from '@nestjs/testing';
import { MockServiceController } from './mock-service.controller';
import { MockServiceService } from './mock-service.service';

describe('MockServiceController', () => {
  let mockServiceController: MockServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MockServiceController],
      providers: [MockServiceService],
    }).compile();

    mockServiceController = app.get<MockServiceController>(MockServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mockServiceController.getHello()).toBe('Hello World!');
    });
  });
});
