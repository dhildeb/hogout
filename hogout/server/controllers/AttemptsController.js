import { Auth0Provider } from '@bcwdev/auth0provider'
import { attemptsService } from '../services/AttemptsService'
import BaseController from '../utils/BaseController'

export class AttemptsController extends BaseController {
  constructor() {
    super('api/attempts')
    this.router
      .get('', this.getAllAttempts)
      .get('/account/:id/attempts', this.getAttemptsByCreatorId)
      .use('', Auth0Provider.getAuthorizedUserInfo)
  }

  async getAllAttempts(req, res, next) {
    try {
      const attempts = await attemptsService.getAllAttempts()
      res.send(attempts)
    } catch (error) {
      next(error)
    }
  }

  async getAttemptsByCreatorId(req, res, next) {
    try {
      const attempts = await attemptsService.getAttemptsByCreatorId(req.params.id)
      res.send(attempts)
    } catch (error) {
      next(error)
    }
  }
}
