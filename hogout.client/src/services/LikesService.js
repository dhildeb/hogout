import { AppState } from '../AppState'
import { PostLike } from '../models/PostLikes'
import { api } from './AxiosService'

class LikesService {
  async getAllPostLikes() {
    const res = api.get('api/posts/likes')
    AppState.postLikes = res.data.map(l => new PostLike(l))
  }

  async getLikesByPostId(postId) {
    const res = api.get('api/posts/' + postId + '/likes')
    AppState.postLikes = res.data.map(l => new PostLike(l))
  }

  async handlePostLike(postId, like) {
    const res = await api.get('api/posts/' + postId + '/likes', like)
    const check = await AppState.postLikes.findOne(l => l.id === res.data.id)

    if (!check) {
      AppState.postLikes.push(new PostLike(res.data))
    }
    AppState.postLikes = AppState.postLikes.filter(l => l.id !== res.data.id)
  }
}

export const likesService = new LikesService()
