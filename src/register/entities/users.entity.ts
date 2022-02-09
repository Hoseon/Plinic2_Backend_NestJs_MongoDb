import * as mongoose from 'mongoose';
import { Mongoose } from "mongoose";
import * as timeZone from 'mongoose-timezone';

export const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String
    },
    from: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDay: {
        type: String,
        required: true
    },
    avata_url: {
        type: String
    },
    pushToken: {
        type: String
    }
},
{
    timestamps : true
});

// UserSchema.plugin(timeZone);

export interface User {
    uid: string
    email: string
    name: string
    nickname: string
    from: string
    gender: string
    birthDay: string
    avata_url: string
    pushToken: string
}