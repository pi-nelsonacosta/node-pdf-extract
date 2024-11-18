import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose'; // Importa MongooseModule
import { DocumentIntelligenceController } from './controllers/document-intelligence.controller';
import { DocumentIntelligenceService } from './services/document-intelligence.service';
import { OcrService } from './services/ocr.service';
import { DocumentLog } from 'src/database/entities/document-log.entity';
import { DocumentLogService } from './services/document-log.service';
import { DocumentLog as MongoDocumentLog, DocumentLogSchema } from 'src/database/entities/document-log.schema'; // Modelo y esquema para MongoDB
import { KeywordProcessorService } from './services/keyword-processor.service';


@Module({
  controllers: [DocumentIntelligenceController],
  providers: [DocumentIntelligenceService, OcrService, DocumentLogService, KeywordProcessorService],
  imports: [
    // MySQL: Registro de la entidad con TypeORM
    TypeOrmModule.forFeature([DocumentLog]),

    // MongoDB: Registro del modelo con Mongoose
    MongooseModule.forFeature([
      { name: MongoDocumentLog.name, schema: DocumentLogSchema },
    ]),
  ],
  exports: [KeywordProcessorService], // Para que pueda ser usado en otros módulos
})
export class DocumentIntelligenceModule {}
