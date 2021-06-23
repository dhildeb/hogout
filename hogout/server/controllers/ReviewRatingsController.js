import { Auth0Provider } from '@bcwdev/auth0provider'
import { reviewRatingsService } from '../services/ReviewRatingsService'
import BaseController from '../utils/BaseController'

export class ReviewRatingsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/review', this.getAllRatings)
      .get('/challenges/:id/review', this.getRatingsByChallengeId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/challenges/:id/review', this.handleRating)
  }

  async getAllRatings(req, res, next) {
    try {
      const ratings = await reviewRatingsService.getAllRatings()
      res.send(ratings)
    } catch (error) {
      next(error)
    }
  }

  async getRatingsByChallengeId(req, res, next) {
    try {
      const ratings = await reviewRatingsService.getRatingsByChallengeId(req.params.id)
      res.send(ratings)
    } catch (error) {
      next(error)
    }
  }

  async handleRating(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const rating = await reviewRatingsService.handleRating(req.params.id, req.userInfo, req.body)
      res.send(rating)
    } catch (error) {
      next(error)
    }
  }
}
