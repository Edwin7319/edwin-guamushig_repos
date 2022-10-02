import { Injectable } from '@nestjs/common';
import { RepositoryResponseDto } from './dto/repository-response.dto';

const TEST_DATA = [
  { id: 1, state: 604 },
  { id: 2, state: 605 },
  { id: 3, state: 606 },
];

@Injectable()
export class MockServiceService {
  getRepositoryStatus(): RepositoryResponseDto {
    return new RepositoryResponseDto(TEST_DATA);
  }
}
