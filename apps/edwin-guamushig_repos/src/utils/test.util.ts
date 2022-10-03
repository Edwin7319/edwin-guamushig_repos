import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { newDb } from 'pg-mem';

import { ENTITIES } from '../constants/entities';

export class TestUtil {
  private static db = newDb({ autoCreateForeignKeyIndices: true });
  private static orm;

  private static interceptQueries(): void {
    this.db.public.interceptQueries((sql) => {
      if (sql === 'SELECT * FROM current_database()') {
        return [{ current_database: 'bdd' }];
      }
      if (sql === 'SELECT version();') {
        return [
          {
            version: 'PostgreSQL 13.7',
          },
        ];
      }
      return null;
    });
  }

  static async testingTypeOrmModuleImports(): Promise<Array<DynamicModule>> {
    this.interceptQueries();

    this.orm?.close();
    this.orm = await this.db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: [...ENTITIES],
      logging: false,
      keepConnectionAlive: true,
      autoLoadEntities: true,
    });

    await this.orm.synchronize();

    return [
      TypeOrmModule.forRoot({
        ...this.orm.options,
      }),
      TypeOrmModule.forFeature([...ENTITIES]),
    ];
  }

  static async setup(fixtures: unknown): Promise<void> {
    for (const table of Object.keys(fixtures)) {
      const entity = fixtures[table].entity;
      for (const item of fixtures[table].data) {
        await getRepository(entity).save(item);
      }
    }
  }
}
