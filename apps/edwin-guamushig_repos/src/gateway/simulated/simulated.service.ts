import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SimulatedService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _configService: ConfigService,
  ) {}

  getRepositories(): Promise<any> {
    const repository$ = this._httpService.get(
      this._configService.get('repositoryUrl'),
    );

    return new Promise<any>((resolve, reject) => {
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
