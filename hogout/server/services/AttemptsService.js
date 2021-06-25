import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class AttemptsService {
  async getChallengesByUserId(id) {
    const uniqueChallenges = []
    const challenges = await dbContext.Attempts.find({ creatorId: id }).populate('challenge', 'name restaurant rewards rules state location image banner')
    challenges.forEach(c => {
      const check = uniqueChallenges.find(ch => ch.id === c.id)
      if (!check) {
        uniqueChallenges.push(c)
      }
    }
    )
    return uniqueChallenges
  }

  async getAllAttempts() {
    const attempts = await dbContext.Attempts.find({}).populate('challenge', 'name restaurant rewards rules state location image banner')
    return attempts
  }

  async getAttemptsByChallengeId(id) {
    const attempts = await dbContext.Attempts.find({ challengeId: id }).populate('challenge', 'name restaurant rewards rules state location image banner')
    return attempts
  }

  async getAttemptsByCreatorId(id) {
    const attempts = await dbContext.Attempts.find({ creatorId: id }).populate('challenge', 'name restaurant rewards rules state location image banner')
    return attempts
  }

  async createAttempt(newAttempt) {
    const attempt = await dbContext.Attempts.create(newAttempt)
    await attempt.populate('challenge', 'name restaurant rewards rules state location image banner').execPopulate()
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
