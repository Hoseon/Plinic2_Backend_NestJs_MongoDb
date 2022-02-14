import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ScNoticeDocument = ScNotice & Document;

@Schema({ timestamps: true })
export class ScNotice { 
    @Prop({required: true})
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, default: true })
    isDel: boolean
}

export const ScNoticeSchema = SchemaFactory.createForClass(ScNotice);