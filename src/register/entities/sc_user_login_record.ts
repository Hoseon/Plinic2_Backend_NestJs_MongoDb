import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScUserLoginRecordSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        ref: 'User'
    }
},
{
    timestamps : true
});

// ScUserLoginRecordSchema.plugin(timeZone);

export interface ScUserLoginRecord {
    readonly uid: string
}