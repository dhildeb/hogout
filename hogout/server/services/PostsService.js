import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PostsService {
  async getAllPosts(id) {
    const posts = await dbContext.Posts.find({ challengeId: id })
    return posts
  }

  async createPost(newPost) {
    const post = await dbContext.Posts.create(newPost)
    return post
  }

  async editPost(id, userId, body) {
    const post = await dbContext.Posts.find({ _id: id, creatorId: userId })
    if (!post) {
      throw new BadRequest('You do not have permission to edit this post.')
    }
    const editedPost = await dbContext.Posts.findByIdAndUpdate(id, body, { new: true })
    return editedPost
  }

  async deletePost(id, userId) {
    const post = await dbContext.Posts.find({ _id: id, creatorId: userId })
    if (!post) {
      throw new BadRequest('You do not have permission to delete this post.')
    }
    const deletedPost = await dbContext.Posts.findByIdAndDelete(id)
    return deletedPost
  }
}

export const postsService = new PostsService()
