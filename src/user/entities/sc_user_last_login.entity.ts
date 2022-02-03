import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScUserLoginRecordDocument = ScUserLoginRecord & Document;

@Schema({
    timestamps: true
})
export class ScUserLoginRecord {
    @Prop({required: true, ref: 'User'})
    uid: string;

    @Prop({required: true, ref: 'User'})
    email: string;

}
export const ScUserLoginRecordSchema = SchemaFactory.createForClass(ScUserLoginRecord);