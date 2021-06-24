const { AppState } = require('../AppState')
const { Attempt } = require('../models/Attempt')
const { api } = require('./AxiosService')

class AttemptsService {
  async getAllAttempts() {
    const res = await api.get('api/attempts')
    AppState.attempts = res.data.map(a => new Attempt(a))
  }
}

export const attemptsService = new AttemptsService()
