import * as mongoose from 'mongoose';
import * as moment from 'moment-timezone';
import * as timeZone from 'mongoose-timezone';
import { ScDeviceLog } from 'src/devicelog/entities/devicelog.entity';

export const ScDeviceCountSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    countLog: [{
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        count: {
            type: Number,
            required: true,
            default: 1
        },
    }],
    devicelog: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'sc_device_log'
    }
}, {timestamps: true});
  
ScDeviceCountSchema.plugin(timeZone);

export interface ScDeviceCount {
    uid: string,
    email: string,
    countLog: [{createdAt: Date, count: string}],
    createdAt: Date,
    devicelog: string,
  }

