import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostLikesSchema = new Schema(
  {
    creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
    postId: { type: mongoose.Types.ObjectId, ref: 'Posts', required: true }
  }
)
