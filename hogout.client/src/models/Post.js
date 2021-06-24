export class Post {
  constructor(data) {
    this.creatorId = data.creatorId
    this.challengeId = data.challengeId
    this.body = data.body
    this.image1 = data.image1
    this.image2 = data.image2
    this.image3 = data.image3
    this.id = data._id
  }
}
