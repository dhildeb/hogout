import { logger } from '../utils/Logger'

const { AppState } = require('../AppState')
const { Attempt } = require('../models/Attempt')
const { api } = require('./AxiosService')

class AttemptsService {
  async getAllAttempts() {
    const res = await api.get('api/attempts')
    AppState.attempts = res.data.map(a => new Attempt(a))
  }

  async getAttemptsByCreatorId(id) {
    const res = await api.get('api/account/' + id + '/attempts')
    AppState.profileAttempts = res.data.map(a => new Attempt(a))
  }

  async createAttempt(challengeId, newAttempt) {
    const res = await api.post('api/challenges/' + challengeId + '/attempts', newAttempt)

    AppState.attempts.push(new Attempt(res.data))
    logger.log(res.data)
  }

  async deleteAttempt(challengeId) {
    const res = await api.delete('api/challenges/' + challengeId + '/attempts')
    AppState.profileAttempts = AppState.profileAttempts.filter(a => a.id !== res.data.id)
    AppState.attempts = AppState.attempts.filter(a => a.id !== res.data.id)
  }
}

export const attemptsService = new AttemptsService()
