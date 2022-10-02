import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseAppService<Entity> {
  protected readonly _repository: Repository<Entity>;

  constructor(_repository: Repository<Entity>) {
    this._repository = _repository;
  }

  async create(data: Entity): Promise<Entity> {
    try {
      return this._repository.save(data);
    } catch (e) {
      throw new InternalServerErrorException('Error creating');
    }
  }

  async update(
    id: number,
    updateData: QueryDeepPartialEntity<Entity>,
  ): Promise<void> {
    try {
      const data = await this._repository.findOneById(id);
      if (!data) {
        throw new NotFoundException(`Registry with id ${id} not found`);
      }

      await this._repository.update(id, { ...updateData });
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
      const data = await this._repository.findOneById(id);
      if (!data) {
        throw new NotFoundException(`Registry with id ${id} not found`);
      }
      return data;
    } catch (e) {
      throw new InternalServerErrorException('Error finding by id');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const registro = await this._repository.findOneById(id);
      await this._repository.remove(registro);
    } catch (e) {
      throw new InternalServerErrorException('Error deleting');
    }
  }
}
