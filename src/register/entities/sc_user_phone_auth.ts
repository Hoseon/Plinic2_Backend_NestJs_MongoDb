import * as mongoose from 'mongoose';
import * as timeZone from 'mongoose-timezone';

export const ScUserPhoneAuthSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    ref: 'User'
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String
  },
  birth: {
    type: String
  },
  name: {
    type: String
  },
  foreigner: {
    type: String
  },
  carrier: {
    type: String
  },
  gender: {
    type: Number
  },
},
{
  timestamps : true
});

// ScUserPhoneAuthSchema.plugin(timeZone);

export interface ScUserPhoneAuth {
    readonly uid: string,
    readonly email: string,
    name: string
    gender: number
    birth: string
    carrier: string
    uniqueKey: string
    uniqueInSite: string
    newsAgency:  string
    phone:  string
    foreigner: String
     
}