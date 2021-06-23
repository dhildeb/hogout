import { Auth0Provider } from '@bcwdev/auth0provider'
import { reviewRatingsService } from '../services/ReviewRatingsService'
import BaseController from '../utils/BaseController'

export class ReviewRatingsController extends BaseController {
  constructor() {
    super('api/review')
    this.router
      .get('', this.getAllRatings)
  }

  async getAllRatings(req, res, next) {
    try {
      const ratings = await reviewRatingsService.getAllRatings()
      res.send(ratings)
    } catch (error) {
      next(error)
    }
  }
}
