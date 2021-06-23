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
      .
  }
}
