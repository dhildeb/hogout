import { dbContext } from '../db/DbContext'

class ChallengesService {
  async getAllChallenges() {
    const challenges = await dbContext.Challenges.find({})
    return challenges
  }

  async getChallengeById(id) {
    const challenge = await dbContext.Challenges.findById(id)
    return challenge
  }

  async createChallenge(newChallenge) {
    const challenge = await dbContext.Challenges.create(newChallenge)
    return challenge
  }
}

export const challengesService = new ChallengesService()
