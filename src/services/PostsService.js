import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { Post } from '../assets/models/Post'
import { convertToQuery } from '../utils/Query'
import Pop from '../utils/Pop'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    logger.log('query' + query)
    const res = await api.get('api/posts' + convertToQuery(query))
    logger.log('posts res', res.data.posts)
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.posts)
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    AppState.posts.unshift(new Post(res.data))
    Pop.toast('YOU Did IT')
    logger.log('create res', res)
  }

  async findPostsByQuery(query) {
    const res = await api.get(`api/posts?query=${query}`)
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(res)
  }
}
export const postsService = new PostsService()
