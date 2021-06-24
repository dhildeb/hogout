export class PostLike {
  constructor(data) {
    this.creatorId = data.creatorId
    this.postId = data.postId
    this.id = data._id
  }
}
