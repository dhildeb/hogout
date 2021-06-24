export class Post {
  constructor(data) {
    this.creatorId = data.creatorId
    this.challengeId = data.challengeId
    this.body = data.body
    this.creator = data.creator
    this.image1 = data.image1 || null
    this.image2 = data.image2 || null
    this.image3 = data.image3 || null
    this.id = data._id
  }
}
