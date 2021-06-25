import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { attemptsService } from '../services/AttemptsService'
import { challengesService } from '../services/ChallengesService'
import BaseController from '../utils/BaseController'
import { BadRequest } from '../utils/Errors'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/:id', this.getProfile)
      .get('/:id/challenges', this.getChallengesByUserId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
  }

  async getChallengesByUserId(req, res, next) {
    try {
      const challenges = await attemptsService.getChallengesByUserId(req.params.id)
      res.send(challenges)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await accountService.getProfile(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      if (!account) {
        throw new BadRequest('Account was not updated')
      }
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
