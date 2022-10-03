import { Module } from '@nestjs/common';
import { MockServiceController } from './mock-service.controller';
import { MockServiceService } from './mock-service.service';

@Module({
  imports: [],
  controllers: [MockServiceController],
  providers: [MockServiceService],
})
export class MockServiceModule {}
