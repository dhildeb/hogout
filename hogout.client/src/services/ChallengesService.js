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
}

export const challengesService = new ChallengesService()
