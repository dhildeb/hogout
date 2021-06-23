import { dbContext } from '../db/DbContext'

class PostLikesService {
  async getAllLikes() {
    const likes = await dbContext.PostLikes.find({})
    return likes
  }

  async getLikesByPostId(id) {
    const likes = await dbContext.PostLikes.find({ postId: id })
    return likes
  }

  async handleLike(likeRequest) {
    const like = await dbContext.PostLikes.find({ postId: likeRequest.postId, creatorId: likeRequest.creatorId })

    if (!like) {
      const newLike = await dbContext.PostLikes.create(likeRequest)
      return newLike
    } else {
      const deletedLike = await dbContext.PostLikes.findOneAndDelete({ postId: likeRequest.postId, creatorId: likeRequest.creatorId })
      return deletedLike
    }
  }
}

export const postLikesService = new PostLikesService()
