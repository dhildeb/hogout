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
    return 'not rated'
  }
  const dif = totalRatings / totalVotes
  if (dif < 1.6) {
    return 'guinea pig'
  }
  if (dif < 2.5) {
    return 'piglet'
  }
  if (dif < 3.5) {
    return 'pig'
  }
  if (dif < 4.5) {
    return 'hog'
  }
  if (dif > 4.5) {
    return 'wild boar'
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
  return totalRatings / totalVotes
}
