import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";
import * as timeZone from 'mongoose-timezone';



export type ScChallengeDocument = ScChallenge & Document;

@Schema({ timestamps: true })
export class ScChallenge { 
    @Prop({ required: true})
    division: string;
    @Prop({ required: true, type: Date})
    startAt;
    @Prop({ required: true, type: Date})
    endAt: Date;
    @Prop({ required: true })
    useDay: number;
    @Prop({ required: true })
    rewardType: string
    @Prop({ required: true })
    rewardName: string
    @Prop({ required: true })
    title: string
    @Prop({ required: true })
    desc: string
    @Prop({ required: true })
    img1_url: string
    @Prop({ required: true })
    img2_url: string
    @Prop({ required: true })
    img3_url: string
    @Prop({ required: true })
    status: string
    
}

export const ScChallengeSchema = SchemaFactory.createForClass(ScChallenge);