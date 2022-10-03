import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseAppService<Entity, CreateDto> {
  protected readonly _repository: Repository<Entity>;

  constructor(_repository: Repository<Entity>) {
    this._repository = _repository;
  }

  async create(data: CreateDto): Promise<Entity> {
    try {
      return this._repository.save(data as any);
    } catch (e) {
      throw new InternalServerErrorException('Error creating');
    }
  }

  async update(
    id: number,
    updateData: QueryDeepPartialEntity<Entity>,
  ): Promise<Entity> {
    const data = await this._repository.findOne(id);
    if (!data) {
      throw new NotFoundException(`Registry with id ${id} not found`);
    }
    try {
      const updated = await this._repository
        .createQueryBuilder()
        .update({ ...updateData })
        .where({
          id,
        })
        .returning('*')
        .execute();

      return updated.raw[0];
    } catch (e) {
      throw new InternalServerErrorException('Error updating');
    }
  }

  async findAll(): Promise<[Entity[], number]> {
    try {
      return this._repository.findAndCount();
    } catch (e) {
      throw new InternalServerErrorException('Error finding all');
    }
  }

  async findById(id: number): Promise<Entity> {
    try {
      return this._repository.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException('Error finding by id');
    }
  }

  async delete(id: number): Promise<void> {
    const registro = await this._repository.findOne(id);

    if (!registro) {
      throw new NotFoundException(`Registry with id ${id} not found`);
    }

    try {
      await this._repository.delete(id);
    } catch (e) {
      throw new InternalServerErrorException('Error deleting');
    }
  }
}
