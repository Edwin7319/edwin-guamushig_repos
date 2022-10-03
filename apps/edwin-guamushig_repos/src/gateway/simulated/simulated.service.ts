import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RepositoryResponseDto } from './dto/repository-response.dto';

@Injectable()
export class SimulatedService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService,
  ) {}

  getRepositories(): Promise<RepositoryResponseDto> {
    const repository$ = this._httpService.get(
      this._configService.get('repositoryUrl'),
    );

    return new Promise<RepositoryResponseDto>((resolve, reject) => {
      repository$.subscribe(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        },
      );
    });
  }
}
