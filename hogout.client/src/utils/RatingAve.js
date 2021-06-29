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
    return 'Not Rated'
  }
  const dif = totalRatings / totalVotes
  if (dif < 1.6) {
    return 'Guinea Pig'
  }
  if (dif < 2.5) {
    return 'Piglet'
  }
  if (dif < 3.5) {
    return 'Pig'
  }
  if (dif < 4.5) {
    return 'Hog'
  }
  if (dif > 4.5) {
    return 'Wild Boar'
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
    return 'Not Rated'
  }
  return totalRatings / totalVotes
}
