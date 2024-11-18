import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentLog } from './entities/document-log.entity';
import { DocumentLog as MongoDocumentLog, DocumentLogSchema } from './entities/document-log.schema';

@Module({
  imports: [
    // Conexión a MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    // Conexión a MongoDB con logs
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionFactory: (connection) => {
          // Log de conexión
          Logger.log(
            `Conectado a MongoDB en ${configService.get<string>('MONGO_URI')}`,
            'MongooseModule',
          );

          // Logs adicionales para eventos de conexión
          connection.on('connected', () =>
            Logger.log('MongoDB conectado exitosamente', 'MongooseModule'),
          );
          connection.on('error', (error: Error) =>
            Logger.error(
              `Error al conectar a MongoDB: ${error.message}`,
              error.stack,
              'MongooseModule',
            ),
          );

          return connection;
        },
      }),
    }),

    // Registrar modelos
    TypeOrmModule.forFeature([DocumentLog]),
    MongooseModule.forFeature([
      { name: MongoDocumentLog.name, schema: DocumentLogSchema },
    ]),
  ],
  exports: [TypeOrmModule, MongooseModule],
})
export class DatabaseModule {}
