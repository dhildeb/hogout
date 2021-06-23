import { Auth0Provider } from '@bcwdev/auth0provider'
import { postLikesService } from '../services/PostLikesService'
import BaseController from '../utils/BaseController'

export class PostLikesController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/posts/likes', this.getAllLikes)
      .get('/posts/:id/likes', this.getLikesByPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/posts/:id/likes', this.handleLike)
  }

  async getAllLikes(req, res, next) {
    try {
      const likes = await postLikesService.getAllLikes()
      res.send(likes)
    } catch (error) {
      next(error)
    }
  }

  async getLikesByPostId(req, res, next) {
    try {
      const likes = await postLikesService.getLikesByPostId(req.params.id)
      res.send(likes)
    } catch (error) {
      next(error)
    }
  }

  async handleLike(req, res, next) {
    try {
      const likeRequest = {}
      likeRequest.creatorId = req.userInfo.id
      likeRequest.postId = req.params.id
      const like = await postLikesService.handleLike(likeRequest)
      res.send(like)
    } catch (error) {
      next(error)
    }
  }
}
