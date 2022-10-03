import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { newDb } from 'pg-mem';

import { ENTITIES } from '../constants/entities';

const db = newDb({ autoCreateForeignKeyIndices: true });
db.public.interceptQueries((sql) => {
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

export const testingTypeOrmModuleImports = async (): Promise<
  Array<DynamicModule>
> => {
  const orm = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: [...ENTITIES],
    logging: false,
    keepConnectionAlive: true,
    autoLoadEntities: true,
  });
  await orm.synchronize();

  return [
    TypeOrmModule.forRoot({
      ...orm.options,
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
  ];
};
