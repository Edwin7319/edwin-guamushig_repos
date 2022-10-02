import { Injectable } from '@nestjs/common';
import { RepositoryResponseDto } from './dto/repository-response.dto';

@Injectable()
export class MockServiceService {
  getRepositoryStatus(): RepositoryResponseDto {
    return new RepositoryResponseDto([
      { id: 1, state: 604 },
      { id: 2, state: 605 },
      { id: 3, state: 606 },
    ]);
  }
}
