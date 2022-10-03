import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { RepositoryResponseDto } from './dto/repository-response.dto';

@Injectable()
export class SimulatedService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService,
  ) {}

  async getRepositories(): Promise<RepositoryResponseDto> {
    try {
      const repository = await this._httpService
        .get(this._configService.get('repositoryUrl'))
        .toPromise();

      return repository.data;
    } catch (e) {
      throw new BadRequestException('Error getting repositories');
    }
  }
}
