import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationType } from '../configuration/configuration.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigurationType>) => ({
        type: 'postgres',
        host: configService.get('database.host', { infer: true }),
        port: configService.get('database.port', { infer: true }),
        username: configService.get('database.user', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        database: configService.get('database.db', { infer: true }),
        entities: [__dirname + '/../**/*.entity.ts'],
        migrations: ['./migrations/*'],
        migrationsTableName: 'enterprise_migrations',
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
