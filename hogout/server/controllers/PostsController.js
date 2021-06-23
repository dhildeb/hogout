import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import { postLikesService } from '../services/PostLikesService'

import BaseController from '../utils/BaseController'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('/likes', this.getAllLikes)
      .get('/:id/likes', this.getLikesByPostId)
      .use('/', Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createPost)
      .post('/:id/likes', this.handleLike)
      .put('/:id', this.editPost)
      .delete('/:id', this.deletePost)
  }

  async createPost(req, res, next) {
    try {
      const newPost = req.body
      newPost.creatorId = req.userInfo.id
      const post = await postsService.createPost(newPost)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async editPost(req, res, next) {
    try {
      const post = await postsService.editPost(req.params.id, req.userInfo.id, req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next) {
    try {
      const post = await postsService.deletePost(req.params.id, req.userInfo.id)
      res.send(post)
    } catch (error) {
      next(error)
    }
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
