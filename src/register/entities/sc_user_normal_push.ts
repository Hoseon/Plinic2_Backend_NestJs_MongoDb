import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScUserNormalPushSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    useYN: {
        type: Boolean
    }
}, {timestamps: true});

ScUserNormalPushSchema.plugin(timeZone);

export interface ScUserNormalPush {
    readonly uid: string
    readonly useYN: boolean
}