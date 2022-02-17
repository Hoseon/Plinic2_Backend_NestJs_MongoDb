import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

export type ScUserRewardDocument = ScUserReward & Document;

@Schema({ timestamps: true })
export class ScUserReward { 
    @Prop({ required: true, ref: 'User' })
    uid: string;

    @Prop({ required: true, ref: 'User' })
    email: string;

    @Prop({ required: true})
    toName: string;

    @Prop({ required: true})
    phone: string;

    @Prop({ required: true })
    address1: string

    @Prop({ required: false })
    address2: string

    @Prop({ required: false })
    postNumber: string

    @Prop({ required: false })
    deliverMsg: string

    @Prop({required: false})
    productName: string
}

export const ScUserRewardSchema = SchemaFactory.createForClass(ScUserReward);