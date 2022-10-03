export class RepositoryDto {
  id: number;
  state: number;
}

export class RepositoryResponseDto {
  repositories: RepositoryDto[];
}
