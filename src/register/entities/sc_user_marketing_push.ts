import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScUserMarketingPushSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    useYN: {
        type: Boolean
    }
}, {timestamps: true});

ScUserMarketingPushSchema.plugin(timeZone);

export interface ScUserMarketingPush {
    readonly uid: string
    readonly useYN: boolean
}