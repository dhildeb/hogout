import { AppState } from '../AppState'
import { PostLike } from '../models/PostLikes'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class LikesService {
  async getAllPostLikes() {
    const res = await api.get('api/posts/likes')
    AppState.postLikes = res.data.map(l => new PostLike(l))
  }

  async getLikesByPostId(postId) {
    const res = await api.get('api/posts/' + postId + '/likes')
    AppState.postLikes = res.data.map(l => new PostLike(l))
  }

  async handlePostLike(postId, like) {
    const res = await api.post('api/posts/' + postId + '/likes', like)
    const check = await AppState.postLikes.find(l => l.id === res.data._id)
    logger.log(check, res.data)
    if (check === undefined) {
      AppState.postLikes.push(new PostLike(res.data))
    } else {
      AppState.postLikes = AppState.postLikes.filter(l => l.id !== res.data._id)
    }
  }
}

export const likesService = new LikesService()
