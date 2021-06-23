import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const DifficultyRatingsSchema = new Schema(
  {
    creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
    challengeId: { type: mongoose.Types.ObjectId, ref: 'Challenge', required: true },
    rating: { type: Number, min: 1, max: 5 }
  }
)
