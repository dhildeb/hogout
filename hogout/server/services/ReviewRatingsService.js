import { dbContext } from '../db/DbContext'

class ReviewRatingsService {
  async getAllRatings() {
    const ratings = await dbContext.ReviewRatings.find({})
    return ratings
  }

  async getRatingsByChallengeId(id) {
    const ratings = await dbContext.ReviewRatings.find({ challengeId: id })
    return ratings
  }

  async handleRating(id, userId, body) {
    const rating = await dbContext.ReviewRatings.find({ challengeId: id, creatorId: userId })
    if (!rating) {
      const newRating = await dbContext.ReviewRatings.create(body)
      return newRating
    } else {
      const updatedRating = await dbContext.ReviewRatings.findOneAndUpdate({ challengeId: id, creatorId: userId }, body)
      return updatedRating
    }
  }
}

export const reviewRatingsService = new ReviewRatingsService()
