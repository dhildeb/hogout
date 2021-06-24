import { AppState } from '../AppState'
import { Challenge } from '../models/Challenge'
import { api } from './AxiosService'

class ChallengesService {
  async getAllChallenges() {
    const res = await api.get('api/challenges')
    AppState.challenges = res.data.map(c => new Challenge(c))
  }

  async getChallengeById(id) {
    const res = await api.get('api/challenges/' + id)
    AppState.activeChallenge = new Challenge(res.data)
  }

  async createChallenge(newChallenge) {
    const res = await api.post('api/challenges', newChallenge)
    AppState.challenges.push(new Challenge(res.data))
  }

  async deleteChallenge(id) {
    const res = await api.delete('api/challenges/' + id)
    AppState.challenges = AppState.challenges.filter(c => c.id !== res.data.id)
  }
}

export const challengesService = new ChallengesService()
