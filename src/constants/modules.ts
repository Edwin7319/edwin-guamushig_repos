import { OrganizationModule } from '../modules/organization/organization.module';
import { TribeModule } from '../modules/tribe/tribe.module';
import { RepositoryModule } from '../modules/repository/repository.module';
import { MetricsModule } from '../modules/metrics/metrics.module';

export const MODULES_APP = [
  OrganizationModule,
  TribeModule,
  RepositoryModule,
  MetricsModule,
];
