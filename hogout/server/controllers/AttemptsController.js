import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'

export class AttemptsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/attempts', this.getAllAttempts)
      .get('/challenges/:id/attempts', this.getAttemptsByChallengeId)
      .get('/account/:id/attempts', this.getAttemptsByCreatorId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/challenges/:id/attempts', this.createAttempt)
      .delete('/attempts/:id', this.deleteAttempt)
  }
  async getAllAttempts(req, res, next) {
    try {
      const attempts = await 
    } catch (error) {
      next(error)
    }
  }
  getAttemptsByChallengeId(arg0, getAttemptsByChallengeId) {
    throw new Error("Method not implemented.")
  }
  getAttemptsByCreatorId(arg0, getAttemptsByCreatorId) {
    throw new Error("Method not implemented.")
  }
  createAttempt(arg0, createAttempt) {
    throw new Error("Method not implemented.")
  }
  deleteAttempt(arg0, deleteAttempt) {
    throw new Error("Method not implemented.")
  }
}
