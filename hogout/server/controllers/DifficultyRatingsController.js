import { Auth0Provider } from '@bcwdev/auth0provider'
import { difficultyRatingsService } from '../services/DifficultyRatingsService'
import BaseController from '../utils/BaseController'

export class DifficultyRatingsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/difficulty', this.getAllRatings)
      .get('/challenges/:id/difficulty', this.getRatingsByChallengeId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/challenges/:id/difficulty', this.handleRating)
  }

  async getAllRatings(req, res, next) {
    try {
      const ratings = await difficultyRatingsService.getAllRatings()
      res.send(ratings)
    } catch (error) {
      next(error)
    }
  }

  async getRatingsByChallengeId(req, res, next) {
    try {
      const ratings = await difficultyRatingsService.getRatingsByChallengeId(req.params.id)
      res.send(ratings)
    } catch (error) {
      next(error)
    }
  }

  async handleRating(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const rating = await difficultyRatingsService.handleRating(req.params.id, req.userInfo, req.body)
      res.send(rating)
    } catch (error) {
      next(error)
    }
  }
}
