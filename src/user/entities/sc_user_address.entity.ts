import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type ScUserAddressDocument = ScUserAddress & Document;

@Schema({
    timestamps: true
})
export class ScUserAddress { 
    @Prop({ required: true, ref: 'User' })
    uid: string;

    @Prop({ required: true, ref: 'User' })
    email: string;

    @Prop({required: true})
    toName: string;

    @Prop({required: false})
    postNumber: number;

    @Prop({required: true})
    address1: string;

    @Prop({required: true})
    address2: string;

    @Prop({required: true})
    phone: string;

    @Prop({ required: true })
    isDefault: boolean

}

export const ScUserAddressSchema = SchemaFactory.createForClass(ScUserAddress);
