
export class Challenge {
  constructor(data) {
    this.creatorId = data.creatorId
    this.name = data.name
    this.restaurant = data.restaurant
    this.rewards = data.rewards
    this.rules = data.rules
    this.state = data.state
    this.location = data.location
    this.image = data.image
    this.banner = data.banner
    this.id = data._id
  }
}
