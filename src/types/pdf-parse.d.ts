declare module 'pdf-parse' {
    export default function pdf(data: Buffer, options?: any): Promise<{
      numpages: number;
      numrender: number;
      info: {
        Title?: string;
        Author?: string;
        Creator?: string;
        Producer?: string;
        CreationDate?: string;
        ModDate?: string;
      };
      metadata?: any;
      text: string; // Contiene el texto extraído del PDF
    }>;
  }
  