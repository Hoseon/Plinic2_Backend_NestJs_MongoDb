import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScUserPushTokenSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        ref: 'User'
    },
    token: {
        type: String
    },
},
{
    timestamps : true
});

// ScUserPushTokenSchema.plugin(timeZone, { paths: ['timeTest'] });

export interface ScUserPushToken {
    readonly uid: string
    token: string
}