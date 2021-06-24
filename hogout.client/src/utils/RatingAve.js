import { AppState } from '../AppState'

export function difficultyRatingAve(challengeId) {
  let totalRatings = 0
  let totalVotes = 0
  AppState.difficultyRatings.forEach(d => {
    if (d.challengeId === challengeId) {
      totalRatings += d.rating
      totalVotes++
    }
  })
  if (totalVotes === 0) {
    return 3
  }
  return totalRatings / totalVotes
}

export function reviewRatingAve(challengeId) {
  let totalRatings = 0
  let totalVotes = 0
  AppState.reviewRatings.forEach(r => {
    if (r.challengeId === challengeId) {
      totalRatings += r.rating
      totalVotes++
    }
  })
  if (totalVotes === 0) {
    return 3
  }
  console.log(totalRatings / totalVotes)
  return totalRatings / totalVotes
}
