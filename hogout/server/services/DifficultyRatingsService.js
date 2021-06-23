import { dbContext } from '../db/DbContext'

class DifficultyRatingsService {
  async getAllRatings() {
    const ratings = await dbContext.DifficultyRatings.find({})
    return ratings
  }

  async getRatingsByChallengeId(id) {
    const ratings = await dbContext.DifficultyRatings.find({ challengeId: id })
    return ratings
  }

  async handleRating(id, userId, body) {
    const rating = await dbContext.DifficultyRatings.find({ challengeId: id, creatorId: userId })
    if (!rating) {
      const newRating = await dbContext.DifficultyRatings.create(body)
      return newRating
    } else {
      const updatedRating = await dbContext.DifficultyRatings.findOneAndUpdate({ challengeId: id, creatorId: userId }, body)
      return updatedRating
    }
  }
}
export const difficultyRatingsService = new DifficultyRatingsService()
