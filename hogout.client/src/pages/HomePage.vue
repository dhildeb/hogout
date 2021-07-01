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
            {{ state.rating }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="filterReset">All</a>
            <a class="dropdown-item" @click="filterForks(1)">1 Fork</a>
            <a class="dropdown-item" @click="filterForks(2)">2 Forks</a>
            <a class="dropdown-item" @click="filterForks(3)">3 Forks</a>
            <a class="dropdown-item" @click="filterForks(4)">4 Forks</a>
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
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { challengesService } from '../services/ChallengesService'
import { ratingsService } from '../services/RatingsService'
import Notification from '../utils/Notification'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      challenges: computed(() => AppState.challenges),
      temp: computed(() => AppState.tempChallenges),
      state: 'state',
      difficulty: 'Difficulty',
      rating: 'Rating',
      filterBy: {}
    })
    onMounted(async() => {
      window.scrollTo({ top: 0 })
      try {
        await challengesService.getAllChallenges()
        await ratingsService.getDifficultyRatings()
        await ratingsService.getReviewRatings()
        await ratingsService.filterChallenges()
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    return {
      state,
      setState(newState) {
        state.state = newState
      },
      filterDifficulty(dStr) {
        state.difficulty = dStr
        state.filterBy.difficulty = dStr
        ratingsService.filterChallenges(state.filterBy)
      },
      filterReset() {
        state.rating = 'Rating'
        state.difficulty = 'Difficulty'
        state.filterBy = {}
        ratingsService.filterChallenges()
      },
      filterForks(num) {
        state.rating = num + ' Forks'
        state.filterBy.forks = num
        ratingsService.filterChallenges(state.filterBy)
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
