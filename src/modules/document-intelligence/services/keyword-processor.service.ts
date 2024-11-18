import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class KeywordProcessorService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey) {
      throw new HttpException('OpenAI API Key is not configured', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Inicializar OpenAI con la API Key directamente
    this.openai = new OpenAI({ apiKey });
  }

  async processKeywords(text: string): Promise<string[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o', // Usa "gpt-4" o "gpt-3.5-turbo" si "gpt-4o" no está disponible
        messages: [
          { role: 'system', content: 'You are an assistant that extracts keywords from text.' },
          { role: 'user', content: `Extract the keywords from this text: "${text}"` },
        ],
        max_tokens: 100,
      });

      const keywords = response.choices[0]?.message?.content;

      if (!keywords) {
        throw new Error('No keywords generated');
      }

      return keywords.split(',').map((keyword: string) => keyword.trim());
    } catch (error) {
      const errorMessage = (error as Error).message; // Cast explícito a Error
      console.error('Error interacting with OpenAI:', errorMessage);
      throw new HttpException('Failed to process keywords', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
