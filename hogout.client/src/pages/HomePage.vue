<template>
  <div class="side-bar d-none d-md-block" v-if="state.account.id">
    <SideBar />
  </div>
  <div class="container bg-grey">
    <div class="row p-5 justify-content-between">
      <div class="col d-flex justify-content-center">
        <button class="btn btn-color" data-toggle="collapse" data-target="#collapseExample" title="Filter">
          Filter
        </button>
      </div>
      <div class="col d-flex justify-content-center">
        <button class="btn btn-color text-red wrapper" @click="filterReset" v-show="state.filterBy.difficulty || state.filterBy.forks || state.filterBy.state" title="Filter Reset">
          Reset
        </button>
      </div>
    </div>
    <div class="row m-0 collapse" id="collapseExample">
      <div class="col dropdown d-flex justify-content-md-end justify-content-center">
        <button class="btn btn-rating dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                title="Filter By Rating"
        >
          {{ state.rating }}
        </button>
        <div class="dropdown-menu bg-grey" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" @click="filterForks(1)">1 Fork</a>
          <a class="dropdown-item" @click="filterForks(2)">2 Forks</a>
          <a class="dropdown-item" @click="filterForks(3)">3 Forks</a>
          <a class="dropdown-item" @click="filterForks(4)">4 Forks</a>
          <a class="dropdown-item" @click="filterForks(5)">5 Forks</a>
        </div>
      </div>

      <div class="col-12 col-sm dropdown d-flex justify-content-center my-3 my-sm-0">
        <div class="btn btn-diff dropdown-toggle"
             id="dropdownMenuButton"
             data-toggle="dropdown"
             aria-haspopup="true"
             aria-expanded="false"
             title="Filter By Difficulty"
        >
          {{ state.difficulty }}
        </div>
        <div class="dropdown-menu bg-grey" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" @click="filterDifficulty('Guinea Pig')">Guinea Pig</a>
          <a class="dropdown-item" @click="filterDifficulty('Piglet')">Piglet</a>
          <a class="dropdown-item" @click="filterDifficulty('Pig')">Pig</a>
          <a class="dropdown-item" @click="filterDifficulty('Hog')">Hog</a>
          <a class="dropdown-item" @click="filterDifficulty('Wild Boar')">Wild Boar</a>
        </div>
      </div>
      <div class="col dropdown d-flex justify-content-md-start justify-content-center">
        <div class="btn btn-location dropdown-toggle"
             id="dropdownMenuButton"
             data-toggle="dropdown"
             aria-haspopup="true"
             aria-expanded="false"
             title="Filter By Difficulty"
        >
          {{ state.newState }}
        </div>
        <div class="dropdown-menu bg-grey" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" @click="filterState('Idaho')">Idaho</a>
          <a class="dropdown-item" @click="filterState('Oregon')">Oregon</a>
          <a class="dropdown-item" @click="filterState('Washington')">Washington</a>
          <a class="dropdown-item" @click="filterState('Nevada')">Nevada</a>
        </div>
      </div>
    </div>
    <div class="row justify-content-center pt-5">
      <div class="col-10 col-md-8 col-lg-6 px-0 d-flex justify-content-between text-center">
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
      newState: 'Idaho',
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
        state.state = 'State'
        state.filterBy = {}
        ratingsService.filterChallenges()
      },
      filterForks(num) {
        state.rating = num > 1 ? num + ' Forks' : num + ' Fork'
        state.filterBy.forks = num
        ratingsService.filterChallenges(state.filterBy)
      },
      filterState(newState) {
        state.newState = newState
        state.filterBy.state = newState
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
::-webkit-scrollbar-thumb {
  background-image: url('https://res.cloudinary.com/ddbxzcb7k/image/upload/v1564751401/fill-01_vgkaj7.svg');
}
.btn-color{
    border-color: #547066;
    border-width: medium;
    color: #547066;
    background-color: #f2f2f2 !important;
    font-weight: bold;
}
.btn-diff{
    border-color: #547066;
    border-width: medium;
    color: rgb(168, 55, 55);
    background-color: #f2f2f2 !important;
    font-weight: bold;
}
.btn-rating{
    border-color: #547066;
    border-width: medium;
    color: #dfa3e1;
    background-color: #f2f2f2 !important;
    font-weight: bold;
}
.btn-location{
    border-color: #547066;
    border-width: medium;
    color: #3ba5dc;
    background-color: #f2f2f2 !important;
    font-weight: bold;
}
.perfectWidth{
  margin-left: calc(3vw + 280px);
  margin-right: 3vw ;
}
.wrapper{
  white-space: nowrap;
}
.bg-grey{
      background-color: #f2f2f2 !important;
}
</style>
