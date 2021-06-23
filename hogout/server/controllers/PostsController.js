import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'

export class PostsController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/boards/:id/posts', this.getAllPosts)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/posts', this.createPost)
      .put('/posts/:id', this.editPost)
      .delete('/posts/:id', this.deletePost)
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postsService.getAllPosts(req.params.id)
      res.send(posts)
    } catch (error) {
      next(error)
    }
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
}
