import { dbContext } from '../db/DbContext'

class ChallengesService {
  async getChallengesByUserId(id) {
    const attempts = await dbContext.Attempts.find({ creatorId: id })
    const challenges = []
    attempts.foreach(async a => {
      const challenge = await dbContext.Challenges.find({ id: a.challengeId })
      const check = challenges.find(challenge)
      if (!check) {
        challenges.push(challenge)
      }
    })

    return challenges
  }

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
