import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";

export type ScUserUnRegisterDocument = ScUserUnRegister & Document;

@Schema({ timestamps: true })
export class ScUserUnRegister { 
    @Prop({ required: true, ref: 'User' })
    uid: string;

    @Prop({ required: true, ref: 'User' })
    email: string;

    @Prop({ required: true})
    phone: string;

    @Prop({ required: true})
    birth: string;

    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    foreigner: string;

    @Prop({ required: true})
    carrier: string;

    @Prop({ required: true})
    gender: number;

    @Prop({ required: true, type: Date })
    unRegisterAt;

}

export const ScUserUnRegisterSchema = SchemaFactory.createForClass(ScUserUnRegister);
