import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScUserAgreeSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        ref: 'User'
    },
    agree1: {
        type: Boolean
    },
    agree2: {
        type: Boolean
    },
    agree3: {
        type: Boolean
    },
    opt_agree4: {
        type: Boolean
    },
    opt_agree5: {
        type: Boolean
    }
}, {timestamps: true});

// ScUserAgreeSchema.plugin(timeZone);

export interface ScUserAgree {
    readonly uid: string
    readonly agree1: boolean
    readonly agree2: boolean
    readonly agree3: boolean
    readonly opt_agree4: boolean
    readonly opt_agree5: boolean
}