declare module 'pdftoimage' {
    interface PdfToImageOptions {
      outputFormat?: string; // Formato de salida, ej. '%d.png'
      outputDirectory?: string; // Carpeta donde se guardan las imágenes
      singleFile?: boolean; // Si se procesa como un único archivo (opcional)
    }
  
    class PdfToImage {
      constructor(filePath: string, options?: PdfToImageOptions);
      convert(): Promise<void>; // Convierte el PDF a imágenes
    }
  
    export { PdfToImage };
  }
  