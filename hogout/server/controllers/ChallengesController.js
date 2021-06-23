
import { Auth0Provider } from '@bcwdev/auth0provider'
import { challengesService } from '../services/ChallengesService'
import BaseController from '../utils/BaseController'

export class ChallengesController extends BaseController {
  constructor() {
    super('/api/challenges')
    this.router
      .get('', this.getAllChallenges)
      .get('/:id', this.getChallengeById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createChallenge)
      .put('/:id', this.editChallenge)
      .delete('/:id', this.deleteChallenge)
  }

  async getAllChallenges(req, res, next) {
    try {
      const challenges = await challengesService.getAllChallenges()
      res.send(challenges)
    } catch (error) {
      next(error)
    }
  }

  async getChallengeById(req, res, next) {
    try {
      const challenge = await challengesService.getChallengeById(req.params.id)
      res.send(challenge)
    } catch (error) {
      next(error)
    }
  }

  async createChallenge(req, res, next) {
    try {
      const newChallenge = req.body
      newChallenge.creatorId = req.userInfo.id
      const challenge = await challengesService.createChallenge(newChallenge)
      res.send(challenge)
    } catch (error) {
      next(error)
    }
  }
}
