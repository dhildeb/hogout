import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const UserChallengeSchema = new Schema(
  {
    creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
    description: { type: String, required: true }
  }
)
