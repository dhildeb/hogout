import { AppState } from '../AppState'
import { api } from './AxiosService'

class ChallengesService {
  async getAllChallenges() {
    const res = await api.get('api/challenges')
    AppState.challenges = res.data
  }

  async getChallengeById(id) {
    const res = await api.get('api/challenges/' + id)
    AppState.challenges = res.data
  }
}

export const challengesService = new ChallengesService()
