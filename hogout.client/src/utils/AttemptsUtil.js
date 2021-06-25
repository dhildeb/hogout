import { AppState } from '../AppState'

export function getUserWins() {
  let total = 0
  AppState.profileAttempts.forEach(a => {
    if (a.completed) {
      total++
    }
  })
  return total
}
