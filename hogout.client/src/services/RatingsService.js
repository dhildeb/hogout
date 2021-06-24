const { AppState } = require('../AppState')
const { Rating } = require('../models/Rating')
const { api } = require('./AxiosService')

class RatingsService {
  async getDifficultyRatings() {
    const res = await api.get('api/difficulty')
    AppState.difficultyRatings = AppState.difficultyRatings.map(r => new Rating(r))
  }
}

export const ratingsService = new RatingsService()
