export class Post {
  constructor(data) {
    this.creatorId = data.creatorId
    this.challengeId = data.challengeId
    this.body = data.body
    this.creator = data.creator
    this.images = data.images || null

    this.id = data._id
  }
}
