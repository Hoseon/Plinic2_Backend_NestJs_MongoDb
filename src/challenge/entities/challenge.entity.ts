import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScChallengeSchema = new mongoose.Schema({
    division: {
        type: String
    },
    startAt: {
        type: Date
    },
    endAt: {
        type: Date
    },
    useDay: {
        type: Number
    },
    rewardType: {
        type: String
    },
    rewardName: {
        type: String
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    img1_url: {
        type: String
    },
    img2_url: {
        type: String
    },
    img3_url: {
        type: String
    },
    status: {
        type: String
    },

}, {timestamps: true});

// ScChallengeSchema.plugin(timeZone, {paths: ['startAt', 'endAt']});

export interface ScChallenge {
readonly division : string
readonly startAt : string
readonly endAt : string
readonly useDay : number
readonly rewardType : string
readonly rewardName : string
readonly title : string
readonly desc : string
readonly img1_url : string
readonly img2_url : string
readonly img3_url : string
readonly status : string
}


// import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Date, Document } from "mongoose";
// import * as timeZone from 'mongoose-timezone';



// export type ScChallengeDocument = ScChallenge & Document;

// @Schema({ timestamps: true })
// export class ScChallenge { 
//     @Prop({ required: true})
//     division: string;
//     @Prop({ required: true, type: Date})
//     startAt;
//     @Prop({ required: true, type: Date})
//     endAt: Date;
//     @Prop({ required: true })
//     useDay: number;
//     @Prop({ required: true })
//     rewardType: string
//     @Prop({ required: true })
//     rewardName: string
//     @Prop({ required: true })
//     title: string
//     @Prop({ required: true })
//     desc: string
//     @Prop({ required: true })
//     img1_url: string
//     @Prop({ required: true })
//     img2_url: string
//     @Prop({ required: true })
//     img3_url: string
//     @Prop({ required: true })
//     status: string
    
// }

// export const ScChallengeSchema = SchemaFactory.createForClass(ScChallenge);