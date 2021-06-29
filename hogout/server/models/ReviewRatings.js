import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ReviewRatingsSchema = new Schema(
  {
    creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
    challengeId: { type: mongoose.Types.ObjectId, ref: 'Challenges', required: true },
    rating: { type: Number, min: 1, max: 10, required: true }
  }
)
