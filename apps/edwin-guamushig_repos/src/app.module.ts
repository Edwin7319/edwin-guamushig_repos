import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MODULES_APP } from './constants/modules';
import configuration from './config/configuration';
import { ENTITIES } from './constants/entities';
import { AddTestData1664824332308 } from './migrations/1664824332308-AddTestData';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbUrl = new URL(config.get('dbUri'));
        const routingId = dbUrl.searchParams.get('options');
        dbUrl.searchParams.delete('options');

        return {
          type: 'cockroachdb',
          url: dbUrl.toString(),
          ssl: true,
          extra: {
            options: routingId,
          },
          entities: [...ENTITIES],
          migrations: [AddTestData1664824332308],
          cli: {
            migrationsDir: './migrations',
          },
          migrationsRun: true,
          synchronize: true,
          dropSchema: true,
        };
      },
    }),
    ...MODULES_APP,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
