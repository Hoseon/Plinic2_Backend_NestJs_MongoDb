import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScUserPhoneAuthSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      gender: {
        type: String
      },
      birth: {
        type: String
      },
      uniqueKey: {
        type: String
      },
      uniqueInSite: {
        type: String
      },
      newsAgency: {
        type: String
      },
      phone: {
        type: String
      },
      foreinger: {
        type: String
      }
}, {timestamps: true});

ScUserPhoneAuthSchema.plugin(timeZone);

export interface ScUserPhoneAuth {
    readonly uid: string,
    readonly name: string
    readonly gender:  string
    readonly birth: string
    readonly uniqueKey: string
    readonly uniqueInSite: string
    readonly newsAgency:  string
    readonly phone:  string
    readonly foreinger: String
     
}