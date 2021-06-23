import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class AttemptsService {
  async getAllAttempts() {
    const attempts = await dbContext.Attempts.find({})
    return attempts
  }

  async getAttemptsByChallengeId(id) {
    const attempts = await dbContext.Attempts.find({ challengeId: id })
    return attempts
  }

  async getAttemptsByCreatorId(id) {
    const attempts = await dbContext.Attempts.find({ creatorId: id })
    return attempts
  }

  async createAttempt(newAttempt) {
    const attempt = await dbContext.Attempts.create(newAttempt)
    return attempt
  }

  async deleteAttempt(id, userId) {
    const attempt = await dbContext.Attempts.find({ challengeId: id, creatorId: userId })
    if (!attempt) {
      throw new BadRequest('You have not added an attempt to this challenge.')
    }
    const deletedAttempt = await dbContext.Attempts.findOneAndDelete({ challengeId: id, creatorId: userId })
    return deletedAttempt
  }
}

export const attemptsService = new AttemptsService()