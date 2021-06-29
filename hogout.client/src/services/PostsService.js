import { AppState } from '../AppState'
import { Post } from '../models/Post'
import { api } from './AxiosService'

class PostsService {
  async getPostsByChallengeId(id) {
    const res = await api.get('api/challenges/' + id + '/posts')
    const postsArr = res.data.map(p => new Post(p))
    AppState.posts = postsArr.reverse()
  }

  async createPost(challengeId, newPost) {
    const res = await api.post('api/challenges/' + challengeId + '/posts', newPost)
    AppState.posts = [new Post(res.data), ...AppState.posts]
  }

  async editPost(post) {
    const res = await api.put('api/posts/' + post.id, post)
    AppState.posts = AppState.posts.filter(p => p.id !== res.data.id)
    AppState.posts.push(new Post(res.data))
  }

  async deletePost(postId) {
    const res = await api.delete('api/posts/' + postId)
    AppState.posts = AppState.posts.filter(p => p.id !== res.data.id)
  }
}

export const postsService = new PostsService()
