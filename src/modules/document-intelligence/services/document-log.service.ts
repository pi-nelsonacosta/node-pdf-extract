import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentLog as MysqlDocumentLog } from 'src/database/entities/document-log.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentLog as MongoDocumentLog, DocumentLogDocument } from 'src/database/entities/document-log.schema';

@Injectable()
export class DocumentLogService {
  constructor(
    @InjectRepository(MysqlDocumentLog)
    private readonly mysqlRepository: Repository<MysqlDocumentLog>, // Repositorio de MySQL

    @InjectModel(MongoDocumentLog.name)
    private readonly mongoModel: Model<DocumentLogDocument>, // Modelo de MongoDB
  ) {}

  // Crear un registro en ambas bases de datos
  async createLog(filename: string, status: string): Promise<void> {
    // Guardar en MySQL
    const mysqlLog = this.mysqlRepository.create({ filename, status });
    await this.mysqlRepository.save(mysqlLog);

    // Guardar en MongoDB
    const mongoLog = new this.mongoModel({ filename, status });
    await mongoLog.save();
  }

  // Obtener todos los registros de MongoDB
  async findAllFromMongo(): Promise<MongoDocumentLog[]> {
    return this.mongoModel.find().exec();
  }

  // Obtener todos los registros de MySQL
  async findAll(): Promise<MysqlDocumentLog[]> {
    return this.mysqlRepository.find();
  }
}

