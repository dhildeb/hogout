export class Attempt {
  constructor(data) {
    this.creatorId = data.creatorId
    this.challengeId = data.challengeId
    this.completed = data.completed
    this.id = data._id
  }
}
