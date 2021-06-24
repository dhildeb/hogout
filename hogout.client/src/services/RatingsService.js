const { AppState } = require('../AppState')
const { Rating } = require('../models/Rating')
const { api } = require('./AxiosService')

class RatingsService {
  async getDifficultyRatings() {
    const res = await api.get('api/difficulty')
    AppState.difficultyRatings = res.data.map(r => new Rating(r))
  }

  async getDifficultyRatingsByChallengeId(id) {
    const res = await api.get('api/challenges/' + id + '/difficulty')
    AppState.difficultyRatings = res.data.map(r => new Rating(r))
  }
}

export const ratingsService = new RatingsService()
