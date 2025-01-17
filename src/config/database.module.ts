// import { Module } from '@nestjs/common';
// import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { ConfigModule, ConfigService } from '@nestjs/config';
//
//
// @Module({
//   imports: [
//     MikroOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) =>
//         defineConfig({
//           dbName: configService.get('DB_NAME'),
//           user: configService.get('DB_USER'),
//           password: configService.get('DB_PASSWORD'),
//           host: configService.get('DB_HOST'),
//           port: configService.get('DB_PORT'),
//           driver: PostgreSqlDriver,
//           entities: ['dist/**/*.entity.js'],
//           entitiesTs: ['src/**/*.entity.ts'],
//           metadataProvider: TsMorphMetadataProvider,
//           flushMode: FlushMode.COMMIT,
//           migrations: {
//             tableName: 'migrations',
//             path: 'dist/migrations',
//             pathTs: 'src/migrations',
//             glob: '!(*.d).{js,ts}',
//             transactional: true,
//             allOrNothing: true,
//             emit: 'ts',
//           },
//         }),
//     }),
//   ],
// })
// export class DatabaseModule {}
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { FlushMode } from '@mikro-orm/core';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        defineConfig({
          dbName: configService.get<string>('DB_NAME'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          driver: PostgreSqlDriver,
          entities: ['dist/**/*.entity.js'],
          entitiesTs: ['src/**/*.entity.ts'],
          metadataProvider: TsMorphMetadataProvider,
          flushMode: FlushMode.COMMIT,
          allowGlobalContext: true,
          migrations: {
            tableName: 'migrations',
            path: 'dist/migrations',
            pathTs: 'src/migrations',
            glob: '!(*.d).{js,ts}',
            transactional: true,
            allOrNothing: true,
            emit: 'ts',
          },
        }),
    }),
  ],
})
export class DatabaseModule {}
