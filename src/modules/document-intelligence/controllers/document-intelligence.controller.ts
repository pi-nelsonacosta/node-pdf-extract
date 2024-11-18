import { 
  Controller, 
  Post, 
  Get, 
  UploadedFile, 
  UseInterceptors, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { multerConfig } from 'src/config/multer.config';
import { OcrService } from '../services/ocr.service';
import { DocumentLogService } from '../services/document-log.service';
import { KeywordProcessorService } from '../services/keyword-processor.service';

@ApiTags('Document Intelligence')
@Controller('document-intelligence')
export class DocumentIntelligenceController {
  constructor(
    private readonly ocrService: OcrService, // Servicio para procesar el archivo
    private readonly documentLogService: DocumentLogService, // Servicio para registrar logs
    private readonly keywordProcessorService: KeywordProcessorService, // Servicio para procesar palabras clave
  ) {}

  @Post('pdf')
  @ApiOperation({ summary: 'Extrae texto directamente de un archivo PDF y procesa palabras clave' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo para procesar',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // Indica que el archivo se envía como binario
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerConfig)) // Configuración de Multer
  async processDocument(
    @UploadedFile() file: { originalname: string; path: string }
  ): Promise<{ message: string; text: string; keywords: string[] }> {
    try {
      // Validar si el archivo fue recibido
      if (!file) {
        throw new HttpException(
          'No se recibió ningún archivo para procesar.',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log(`Archivo recibido: ${file.originalname}`);

      // Procesar el archivo usando OcrService
      const text = await this.ocrService.extractText(file);

      // Procesar palabras clave con KeywordProcessorService
      const keywords = await this.keywordProcessorService.processKeywords(text);

      // Registrar log en la base de datos con estado "Done"
      await this.documentLogService.createLog(file.originalname, 'Done');

      // Devolver respuesta exitosa
      return {
        message: 'Archivo procesado exitosamente',
        text,
        keywords, // Incluye las palabras clave procesadas en la respuesta
      };
    } catch (error) {
      const errorMessage = (error as Error).message; // Convertir el error a tipo Error
      console.error('Error procesando el archivo:', errorMessage);

      // Registrar log en la base de datos con estado "Failed"
      if (file?.originalname) {
        await this.documentLogService.createLog(file.originalname, 'Failed');
      }

      // Lanzar un error HTTP 500
      throw new HttpException(
        'Error procesando el archivo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('logs') // Nuevo método para obtener todos los registros
  @ApiOperation({ summary: 'Obtener todos los registros de procesamiento' })
  async getAllLogs() {
    try {
      const logs = await this.documentLogService.findAll(); // Llama al servicio para obtener todos los registros
      return logs; // Devuelve la lista de logs
    } catch (error) {
      console.error('Error al obtener los registros:', (error as Error).message); // Cast explícito de error
      throw new HttpException(
        'Error al obtener los registros',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
 
  @Get('mongo-logs') // Nuevo endpoint
  @ApiOperation({ summary: 'Obtener todos los registros desde MongoDB' })
  async getMongoLogs() {
    try {
      const logs = await this.documentLogService.findAllFromMongo();
      return logs;
    } catch (error) {
      console.error('Error al obtener los registros de MongoDB:', (error as Error).message);
      throw new HttpException('Error al obtener los registros de MongoDB', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
