import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ChallengesSchema = new Schema(
  {
    creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true },
    restaurant: { type: String, required: true },
    rewards: { type: String, required: true },
    rules: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
    banner: { type: String }

  }
)
