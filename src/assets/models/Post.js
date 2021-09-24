export class Post {
  constructor(data = {}) {
    // TODO this might need an underscore
    this.id = data.id || data._id
    this.title = data.title
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.creator = data.creator || {}
    this.likes = data.likes
    this.likeIds = data.likeIds
  }
}
