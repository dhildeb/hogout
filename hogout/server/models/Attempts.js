import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AttemptsSchema = new Schema({
  creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
  challengeId: { type: mongoose.Types.ObjectId, ref: 'Challenges', required: true },
  completed: { type: Boolean, default: false, required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

AttemptsSchema.virtual('challenge',
  {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Challenges'
  })
