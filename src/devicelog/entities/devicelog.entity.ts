import * as mongoose from 'mongoose';
import * as moment from 'moment-timezone';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 
export type ScDeviceLogDocument = ScDeviceLog & Document;

@Schema({timestamps: true})
export class ScDeviceLog {
    @Prop({ required: true })
    uid: string;
    @Prop({ required: true })
    email: string;
    @Prop()
    from: string;
    @Prop({
        type: [{
            time: { type: Number, required: true },
            createdTime: {type: Date, required: true, default: Date.now},
        }]
    })
    log: [{
      time: number,
      createdTime: Date,
    }]
}

export const ScDeviceLogSchema = SchemaFactory.createForClass(ScDeviceLog);