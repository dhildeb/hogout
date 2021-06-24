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

  async handleDifficultyRating(challengeId, newRating) {
    const res = await api.post('api/challenges/' + challengeId + '/difficulty', newRating)
    const rating = AppState.difficultyRatings.find(r => r.id === res.data.id)

    if (!rating) {
      AppState.difficultyRatings.push(new Rating(res.data))
    } else {
      AppState.difficultyRatings = AppState.difficultyRatings.filter(r => r.id !== res.data.id)
      AppState.difficultyRatings.push(new Rating(res.data))
    }
  }
}

export const ratingsService = new RatingsService()
