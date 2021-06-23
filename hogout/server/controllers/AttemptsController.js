import { Auth0Provider } from '@bcwdev/auth0provider'
import { attemptsService } from '../services/AttemptsService'
import BaseController from '../utils/BaseController'

export class AttemptsController extends BaseController {
  constructor() {
    super('api/attempts/')
    this.router
      .get('', this.getAllAttempts)
      .get('/account/:id/attempts', this.getAttemptsByCreatorId)
      .use('', Auth0Provider.getAuthorizedUserInfo)
      .post('/challenges/:id/attempts', this.createAttempt)
      .delete('/challenges/:id/attempts', this.deleteAttempt)
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

  async createAttempt(req, res, next) {
    try {
      const newAttempt = req.body
      newAttempt.creatorId = req.userInfo.id
      newAttempt.challengeId = req.params.id
      const attempt = await attemptsService.createAttempt(newAttempt)
      res.send(attempt)
    } catch (error) {
      next(error)
    }
  }

  async deleteAttempt(req, res, next) {
    try {
      const attempt = await attemptsService.deleteAttempt(req.params.id, req.userInfo.id)
      res.send(attempt)
    } catch (error) {
      next(error)
    }
  }
}
