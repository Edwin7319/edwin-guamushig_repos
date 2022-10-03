import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAppService } from '../../base/base-app.service';
import { MetricsEntity } from './entity/metrics.entity';
import { MetricsCreateDto } from './dto/metrics-create.dto';
import { RepositoryStateEnum } from '../repository/enum/repository.enum';
import { RepositoryMetricsResponseDto } from './dto/repository-metrics-response.dto';
import { TribeEntity } from '../tribe/entity/tribe.entity';
import { SimulatedService } from '../../gateway/simulated/simulated.service';

@Injectable()
export class MetricsService extends BaseAppService<
  MetricsEntity,
  MetricsCreateDto
> {
  constructor(
    @InjectRepository(MetricsEntity)
    private readonly _metricsRepository: Repository<MetricsEntity>,
    @InjectRepository(TribeEntity)
    private readonly _tribeRepository: Repository<TribeEntity>,
    private readonly _simulateService: SimulatedService,
  ) {
    super(_metricsRepository);
  }

  async getRepositoryMetrics(
    tribeId: number,
  ): Promise<RepositoryMetricsResponseDto> {
    await this.checkIfTribeExists(tribeId);

    const { repositories } = await this._simulateService.getRepositories();

    const responseQuery = await this._metricsRepository
      .createQueryBuilder('metrics')
      .innerJoinAndSelect('metrics.repository', 'repository')
      .innerJoinAndSelect('repository.tribe', 'tribe')
      .innerJoinAndSelect('tribe.organization', 'organization')
      .where('repository.state = :state', {
        state: RepositoryStateEnum.ENABLE,
      })
      .andWhere('metrics.coverage > :coverage', { coverage: 75 })
      .andWhere('tribe.id = :tribeId', { tribeId })
      .getMany();

    if (!responseQuery.length) {
      throw new NotFoundException(
        'La tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );
    }

    return new RepositoryMetricsResponseDto(responseQuery, repositories);
  }

  async checkIfTribeExists(tribeId: number): Promise<boolean> {
    const existTribe = await this._tribeRepository.findOne(tribeId);

    if (!existTribe) {
      throw new NotFoundException('La tribu no se encuentra registrada');
    }
    return true;
  }
}
