<template>
  <div class="container">
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
            <a class="dropdown-item" @click="filterDifficulty('guinea pig')">guinea pig</a>
            <a class="dropdown-item" @click="filterDifficulty('piglet')">piglet</a>
            <a class="dropdown-item" @click="filterDifficulty('pig')">pig</a>
            <a class="dropdown-item" @click="filterDifficulty('hog')">hog</a>
            <a class="dropdown-item" @click="filterDifficulty('wild boar')">wild boar</a>
          </div>
        </div>
      </div>
    </div>
    <ChallengeCard v-for="challenge in state.challenges" :key="challenge.id" :challenge="challenge" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { challengesService } from '../services/ChallengesService'
import { ratingsService } from '../services/RatingsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      challenges: computed(() => AppState.challenges),
      state: 'state',
      difficulty: 'difficulty'
    })
    watchEffect(async() => {
      await challengesService.getAllChallenges()
      await ratingsService.getDifficultyRatings()
      await ratingsService.getReviewRatings()
    })
    return {
      state,
      setState(newState) {
        state.state = newState
      },
      filterDifficulty(difficulty) {
        state.difficulty = difficulty
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
