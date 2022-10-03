import { MetricsEntity } from '../entity/metrics.entity';
import { Util } from '../../../utils/util';
import { RepositoryDto } from '../../../gateway/simulated/dto/repository-response.dto';

class RepositoryMetricsDto {
  id: string;
  name: string;
  tribe: string;
  organization: string;
  coverage: string;
  codeSmells: number;
  bugs: number;
  vulnerabilities: number;
  hotspots: number;
  verificationState: string;
  state: string;

  constructor(metric: MetricsEntity, repository: RepositoryDto) {
    this.id = `${metric.repository.id}`;
    this.name = metric.repository.name;
    this.tribe = metric.repository.tribe.name;
    this.organization = metric.repository.tribe.organization.name;
    this.coverage = `${metric.coverage}%`;
    this.codeSmells = metric.codeSmells;
    this.bugs = metric.bugs;
    this.vulnerabilities = metric.vulnerabilities;
    this.hotspots = metric.hotspot;
    this.verificationState = Util.transformMockServiceStatus(repository?.state);
    this.state = Util.transformRepositoryStatus(metric.repository.status);
  }
}

export class RepositoryMetricsResponseDto {
  repositories: RepositoryMetricsDto[];

  constructor(data: MetricsEntity[], repositories: RepositoryDto[]) {
    this.repositories = data.map((metric) => {
      const repository = repositories.find(
        (repo) => repo.id === metric.repository.id,
      );
      return new RepositoryMetricsDto(metric, repository);
    });
  }
}
