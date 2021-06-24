import { AppState } from '../AppState'
import { PostLike } from '../models/PostLikes'
import { api } from './AxiosService'

class LikesService {
  async getAllPostLikes() {
    const res = api.get('api/posts/likes')
    AppState.postLikes = res.data.map(l => new PostLike(l))
  }
}

export const likesService = new LikesService()
