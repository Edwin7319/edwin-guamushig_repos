import { Controller, Get } from '@nestjs/common';
import { MockServiceService } from './mock-service.service';
import { RepositoryResponseDto } from './dto/repository-response.dto';

@Controller()
export class MockServiceController {
  constructor(private readonly mockServiceService: MockServiceService) {}

  @Get()
  getRepositoryStatus(): RepositoryResponseDto {
    return this.mockServiceService.getRepositoryStatus();
  }
}
