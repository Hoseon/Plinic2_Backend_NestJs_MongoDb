import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScUserPushTokenSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
},
{
    timestamps : true
});

ScUserPushTokenSchema.plugin(timeZone);

export interface ScUserPushToken {
    readonly uid: string
    readonly token: string
}