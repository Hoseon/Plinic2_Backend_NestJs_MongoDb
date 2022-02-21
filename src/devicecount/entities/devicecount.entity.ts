import * as mongoose from 'mongoose';
import * as moment from 'moment-timezone';
import * as timeZone from 'mongoose-timezone';

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
            type: String,
            required: true,
            default: 1
        },
    }],
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    users: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User'
    },
    pointlog: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'pointlog'
    }
});
  
ScDeviceCountSchema.plugin(timeZone);

export interface ScDeviceCount {
    uid: string,
    email: string,
    countLog: [{createdAt: Date, count: string}],
    createdAt: Date,
    // updatedAt: Date,
    // users : string,   
  }

