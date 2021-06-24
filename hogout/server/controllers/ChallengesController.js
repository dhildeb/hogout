
import { Auth0Provider } from '@bcwdev/auth0provider'
import { challengesService } from '../services/ChallengesService'
import { difficultyRatingsService } from '../services/DifficultyRatingsService'
import { attemptsService } from '../services/AttemptsService'
import { postsService } from '../services/PostsService'
import { reviewRatingsService } from '../services/ReviewRatingsService'

import BaseController from '../utils/BaseController'

export class ChallengesController extends BaseController {
  constructor() {
    super('api/challenges')
    this.router
      .get('', this.getAllChallenges)
      .get('/:id', this.getChallengeById)
      .get('/:id/attempts', this.getAttemptsByChallengeId)
      .get('/:id/difficulty', this.getDifficultyRatingsByChallengeId)
      .get('/:id/review', this.getReviewRatingsByChallengeId)
      .get('/:id/posts', this.getAllPosts)
      .use('', Auth0Provider.getAuthorizedUserInfo)
      .post('/:id/review', this.handleReviewRating)
      .post('', this.createChallenge)
      .post('/:id/difficulty', this.handleDifficultyRating)
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

  async editChallenge(req, res, next) {
    try {
      const challenge = await challengesService.editChallenge(req.params.id, req.body)
      res.send(challenge)
    } catch (error) {
      next(error)
    }
  }

  async deleteChallenge(req, res, next) {
    try {
      const challenge = await challengesService.deleteChallenge(req.params.id)
      res.send(challenge)
    } catch (error) {
      next(error)
    }
  }

  async getDifficultyRatingsByChallengeId(req, res, next) {
    try {
      const ratings = await difficultyRatingsService.getRatingsByChallengeId(req.params.id)
      res.send(ratings)
    } catch (error) {
      next(error)
    }
  }

  async getAttemptsByChallengeId(req, res, next) {
    try {
      const attempts = await attemptsService.getAttemptsByChallengeId(req.params.id)
      res.send(attempts)
    } catch (error) {
      next(error)
    }
  }

  async handleDifficultyRating(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const rating = await difficultyRatingsService.handleRating(req.params.id, req.userInfo, req.body)
      res.send(rating)
    } catch (error) {
      next(error)
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postsService.getAllPosts(req.params.id)
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getReviewRatingsByChallengeId(req, res, next) {
    try {
      const ratings = await reviewRatingsService.getRatingsByChallengeId(req.params.id)
      res.send(ratings)
    } catch (error) {
      next(error)
    }
  }

  async handleReviewRating(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const rating = await reviewRatingsService.handleRating(req.params.id, req.userInfo, req.body)
      res.send(rating)
    } catch (error) {
      next(error)
    }
  }
}
