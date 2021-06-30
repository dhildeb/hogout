import { AppState } from '../AppState'
import { Rating } from '../models/Rating'
import { logger } from '../utils/Logger'
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
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
    logger.log(newRating)
    const res = await api.post('api/challenges/' + challengeId + '/reviews', newRating)
    const rating = AppState.reviewRatings.find(r => r.id === res.data.id)

    if (!rating) {
      AppState.reviewRatings.push(new Rating(res.data))
    } else {
      AppState.reviewRatings = AppState.reviewRatings.filter(r => r.id !== res.data.id)
      AppState.reviewRatings.push(new Rating(res.data))
    }
  }

  // TODO allow filter both difficulty and forks
  filterDifficulty(filter) {
    AppState.tempChallenges = []
    AppState.challenges.forEach(c => {
      const currentR = difficultyRatingAve(c.id)
      if (currentR === filter.difficulty || Math.round(reviewRatingAve(c.id)) === filter.forks) {
        AppState.tempChallenges.push(c)
      }
    })
  }

  filterForks(filter) {
    AppState.tempChallenges = []
    AppState.challenges.forEach(c => {
      const currentR = difficultyRatingAve(c.id)
      if (Math.round(reviewRatingAve(c.id)) === filter.forks || currentR === filter.difficulty) {
        AppState.tempChallenges.push(c)
      }
    })
  }

  filterReset() {
    AppState.tempChallenges = AppState.challenges
  }
}

export const ratingsService = new RatingsService()
