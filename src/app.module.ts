import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { DocumentIntelligenceModule } from './modules/document-intelligence/document-intelligence.module';
import { AppController } from './app.controller'; // Importa el nuevo controlador

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    DocumentIntelligenceModule,
  ],
  controllers: [AppController], // Incluye el controlador en los controladores
})
export class AppModule {}
