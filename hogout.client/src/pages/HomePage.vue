<template>
  <div class="side-bar d-none d-md-block" v-if="state.account.id">
    <SideBar />
  </div>
  <div class="container bg-grey">
    <div class="row justify-content-center py-4">
      <div class="col-10 col-md-8 col-lg-6 px-0 d-flex justify-content-between text-center">
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            Rating
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="filterForks(1)">1 Fork</a>
            <a class="dropdown-item" @click="filterForks(2)">2 Forks</a>
            <a class="dropdown-item" @click="filterForks(3)">3 Forks</a>
            <a class="dropdown-item" @click="filterForks(4)">Fork Forks</a>
            <a class="dropdown-item" @click="filterForks(5)">5 Forks</a>
          </div>
        </div>

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
            <a class="dropdown-item" @click="filterReset()">All</a>
            <a class="dropdown-item" @click="filterDifficulty('Guinea Pig')">Guinea Pig</a>
            <a class="dropdown-item" @click="filterDifficulty('Piglet')">Piglet</a>
            <a class="dropdown-item" @click="filterDifficulty('Pig')">Pig</a>
            <a class="dropdown-item" @click="filterDifficulty('Hog')">Hog</a>
            <a class="dropdown-item" @click="filterDifficulty('Wild Boar')">Wild Boar</a>
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
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      challenges: computed(() => AppState.challenges),
      temp: computed(() => AppState.tempChallenges),
      state: 'state',
      difficulty: 'difficulty'
    })
    watchEffect(async() => {
      await challengesService.getAllChallenges()
      await ratingsService.getDifficultyRatings()
      await ratingsService.getReviewRatings()
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
      },
      filterForks(num) {
        AppState.tempChallenges = []
        state.challenges.forEach(c => {
          if (Math.round(reviewRatingAve(c.id)) === num) {
            AppState.tempChallenges.push(c)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.side-bar{
  min-width: 30vh;
}
.bg-gray{
  background-color: #E8E8E8;
}
</style>
