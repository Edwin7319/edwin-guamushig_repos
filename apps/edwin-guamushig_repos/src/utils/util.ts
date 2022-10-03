import { RepositoryStatusEnum } from '../modules/repository/enum/repository.enum';

export class Util {
  static transformRepositoryStatus(status: RepositoryStatusEnum): string {
    switch (status) {
      case RepositoryStatusEnum.ACTIVE:
        return 'Habilitado';
      case RepositoryStatusEnum.INACTIVE:
        return 'Deshabilitado';
      default:
        return null;
    }
  }
  static transformMockServiceStatus(status: number): string {
    switch (status) {
      case 604:
        return 'Verificado';
      case 605:
        return 'En espera';
      case 606:
        return 'Aprobado';
      default:
        return 'Sin estado';
    }
  }
}
