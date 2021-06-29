import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  challenges: [],
  posts: [],
  activeProfile: {},
  activeChallenge: {},
  attempts: [],
  profileAttempts: [],
  difficultyRatings: [],
  reviewRatings: [],
  postLikes: [],
  tempChallenges: [],
  profileChallenges: []
})
