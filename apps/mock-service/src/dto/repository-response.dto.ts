class RepositoryDto {
  id: number;
  state: number;
}

export class RepositoryResponseDto {
  repositories: RepositoryDto[];

  constructor(repositories: RepositoryDto[]) {
    this.repositories = repositories;
  }
}
