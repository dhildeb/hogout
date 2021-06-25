import { AppState } from '../AppState'
import { Rating } from '../models/Rating'
import { api } from './AxiosService'

class RatingsService {
  async getDifficultyRatings() {
    const res = await api.get('api/difficulties')
    AppState.difficultyRatings = res.data.map(r => new Rating(r))
  }

  async getDifficultyRatingsByChallengeId(id) {
    const res = await api.get('api/challenges/' + id + '/difficulties')
    AppState.difficultyRatings = res.data.map(r => new Rating(r))
  }

  async handleDifficultyRating(challengeId, newRating) {
    const res = await api.post('api/challenges/' + challengeId + '/difficulties', newRating)
    const rating = AppState.difficultyRatings.find(r => r.id === res.data.id)

    if (!rating) {
      AppState.difficultyRatings.push(new Rating(res.data))
    } else {
      AppState.difficultyRatings = AppState.difficultyRatings.filter(r => r.id !== res.data.id)
      AppState.difficultyRatings.push(new Rating(res.data))
    }
  }

  async getReviewRatings() {
    const res = await api.get('api/reviews')
    AppState.reviewRatings = res.data.map(r => new Rating(r))
  }

  async getReviewRatingsByChallengeId(id) {
    const res = await api.get('api/challenges/' + id + '/reviews')
    AppState.reviewRatings = res.data.map(r => new Rating(r))
  }

  async handleReviewRating(challengeId, newRating) {
    const res = await api.post('api/challenges/' + challengeId + '/reviews', newRating)
    const rating = AppState.reviewRatings.find(r => r.id === res.data.id)

    if (!rating) {
      AppState.reviewRatings.push(new Rating(res.data))
    } else {
      AppState.reviewRatings = AppState.reviewRatings.filter(r => r.id !== res.data.id)
      AppState.reviewRatings.push(new Rating(res.data))
    }
  }
}

export const ratingsService = new RatingsService()
