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

  async editChallenge(id, body) {
    const challenge = await dbContext.Challenges.findByIdAndUpdate(id, body, { new: true })
    return challenge
  }

  async deleteChallenge(id) {
    const challenge = await dbContext.Challenges.findByIdAndDelete(id)
    return challenge
  }
}

export const challengesService = new ChallengesService()
