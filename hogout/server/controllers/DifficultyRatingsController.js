import { Auth0Provider } from '@bcwdev/auth0provider'
import { difficultyRatingsService } from '../services/DifficultyRatingsService'
import BaseController from '../utils/BaseController'

export class DifficultyRatingsController extends BaseController {
  constructor() {
    super('api/difficulties')
    this.router
      .get('', this.getAllRatings)
      .use('', Auth0Provider.getAuthorizedUserInfo)
  }

  async getAllRatings(req, res, next) {
    try {
      const ratings = await difficultyRatingsService.getAllRatings()
      res.send(ratings)
    } catch (error) {
      next(error)
    }
  }
}
