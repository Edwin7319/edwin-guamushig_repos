import { Controller } from '@nestjs/common';
import { BaseAppController } from '../../base/base-app.controller';
import { TribeEntity } from './entity/tribe.entity';
import { TribeCreateDto } from './dto/tribe-create.dto';
import { TribeService } from './tribe.service';

@Controller('tribe')
export class TribeController extends BaseAppController<
  TribeEntity,
  TribeCreateDto
> {
  constructor(private readonly _tribeService: TribeService) {
    super(_tribeService);
  }
}
