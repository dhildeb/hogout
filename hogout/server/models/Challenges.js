import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ChallengesSchema = new Schema(
  {
    creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
    body: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String }

  }
)