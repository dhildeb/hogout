import { AppState } from '../AppState'

export function filterDifficulty(difficulty) {
  AppState.challenges.filter(c => c.difficulty === difficulty)
}
