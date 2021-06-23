import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { AttempsSchema } from '../models/Attempts'
import { ChallengesSchema } from '../models/Challenges'
import { DifficultyRatingsSchema } from '../models/DifficultyRatings'
import { ReviewRatingsSchema } from '../models/ReviewRatings'
import { PostsSchema } from '../models/Posts'
import { PostLikesSchema } from '../models/PostLikes'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Attempts = mongoose.model('Attempts', AttempsSchema);
  Challenges = mongoose.model('Challenges', ChallengesSchema);
  DifficultyRatings = mongoose.model('DifficultyRatings', DifficultyRatingsSchema);
  ReviewRatings = mongoose.model('ReviewRatings', ReviewRatingsSchema);
  Posts = mongoose.model('Posts', PostsSchema);
  PostLikes = mongoose.model('PostLikes', PostLikesSchema);
}

export const dbContext = new DbContext()
