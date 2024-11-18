import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentIntelligenceService {
  summarizeText(text: string): string {
    return `Resumen del texto: ${text}`;
  }
}
