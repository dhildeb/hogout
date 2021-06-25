import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostsSchema = new Schema(
  {
    creatorId: { type: mongoose.Types.ObjectId, ref: 'Account', required: true },
    challengeId: { type: mongoose.Types.ObjectId, ref: 'Challenges', required: true },
    body: { type: String, requied: true },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)

PostsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
