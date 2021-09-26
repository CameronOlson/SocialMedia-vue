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

  async likePost(postId) {
    const res = await api.post('api/posts/' + postId + '/like')
    logger.log('PostsService res', res.data)
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    logger.log(res)
    AppState.posts = AppState.posts.filter(p => p.id !== postId)
  }

  async getOlderPosts(page) {
    const pageNumber = page += 1
    const res = await api.get(`api/posts/?page=${pageNumber}`)
    logger.log('this is the get older post function from the posts service', res)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.currentPage = page
  }

  async getNewerPosts(page) {
    page -= 1
    const res = await api.get(`api/posts/?page=${page}`)
    logger.log('this is the get newer post function from postsService', res)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.currentPage = page
  }
}
export const postsService = new PostsService()
