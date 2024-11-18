import { Injectable } from '@nestjs/common';
const pdf = require('pdf-parse'); // Importa con require
import * as fs from 'fs/promises';

@Injectable()
export class OcrService {
  async extractText(file: { originalname: string; path: string }): Promise<string> {
    try {
      // Leer el archivo PDF
      const pdfBuffer = await fs.readFile(file.path);
      const pdfData = await pdf(pdfBuffer);

      // Retorna el texto extraído
      return pdfData.text;
    } catch (error) {
      console.error('Error en OCR Service:', (error as Error).message);
      throw new Error('Error extrayendo texto del archivo');
    }
  }
}
