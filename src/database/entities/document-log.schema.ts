import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocumentLogDocument = HydratedDocument<DocumentLog>;

@Schema({ timestamps: true }) // Agrega createdAt y updatedAt automáticamente
export class DocumentLog {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const DocumentLogSchema = SchemaFactory.createForClass(DocumentLog);
