import { Test, TestingModule } from '@nestjs/testing';
import { SimulatedService } from './simulated.service';

describe('SimulatedServiceService', () => {
  let service: SimulatedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulatedService],
    }).compile();

    service = module.get<SimulatedService>(SimulatedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
