import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AttempsSchema = new Schema({
  creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
  challengeId: { type: mongoose.Types.ObjectId, ref: 'Challenge', required: true },
  completed: { type: Boolean, default: false, required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)
