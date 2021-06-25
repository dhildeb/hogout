<template>
  <div class="side-bar d-none d-md-block">
    <SideBar />
  </div>
  <div class="container bg-white">
    <div class="row justify-content-between bg-white py-4">
      <div class="col-6 text-center">
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            {{ state.state }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" @click="setState('idaho')">
            <a class="dropdown-item">Idaho</a>
          </div>
        </div>
      </div>
      <div class="col-6 text-center">
        <div class="dropdown">
          <div class="btn btn-outline-primary dropdown-toggle"
               id="dropdownMenuButton"
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false"
          >
            {{ state.difficulty }}
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="filterReset()">all</a>
            <a class="dropdown-item" @click="filterDifficulty('guinea pig')">guinea pig</a>
            <a class="dropdown-item" @click="filterDifficulty('piglet')">piglet</a>
            <a class="dropdown-item" @click="filterDifficulty('pig')">pig</a>
            <a class="dropdown-item" @click="filterDifficulty('hog')">hog</a>
            <a class="dropdown-item" @click="filterDifficulty('wild boar')">wild boar</a>
          </div>
        </div>
      </div>
    </div>
    <ChallengeCard v-for="challenge in state.temp" :key="challenge.id" :challenge="challenge" />
    <div class="row p-5"></div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { challengesService } from '../services/ChallengesService'
import { ratingsService } from '../services/RatingsService'
import { difficultyRatingAve } from '../utils/RatingAve'
import { accountService } from '../services/AccountService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      challenges: computed(() => AppState.challenges),
      temp: computed(() => AppState.tempChallenges),
      state: 'state',
      difficulty: 'difficulty'
    })
    watchEffect(async() => {
      await challengesService.getAllChallenges()
      await ratingsService.getDifficultyRatings()
      await ratingsService.getReviewRatings()
      await accountService.getUserAttempts()
      AppState.tempChallenges = AppState.challenges
    })
    return {
      state,
      setState(newState) {
        state.state = newState
      },
      filterDifficulty(dStr) {
        AppState.tempChallenges = []
        state.difficulty = dStr
        state.challenges.forEach(c => {
          const currentR = difficultyRatingAve(c.id)
          if (currentR === dStr) {
            AppState.tempChallenges.push(c)
          }
        })
      },
      filterReset() {
        state.difficulty = 'All'
        AppState.tempChallenges = AppState.challenges
      }
    }
  }
}
</script>

<style scoped lang="scss">
.side-bar{
  min-width: 30vh;
}
</style>
