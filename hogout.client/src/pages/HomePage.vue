<template>
  <div class="side-bar d-none d-md-block" v-if="state.account.id">
    <SideBar />
  </div>
  <div class="container bg-grey">
    <div class="row p-5 justify-content-center">
      <button class="btn btn-color" data-toggle="collapse" data-target="#collapseExample" title="Filter">
        Filter
      </button>
      <div class="col-8"></div>
    </div>
    <div class="row m-0 collapse" id="collapseExample">
      <div class="card-body d-flex justify-content-center">
        <div class="dropdown mr-5">
          <button class="btn btn-color dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  title="Filter By Rating"
          >
            {{ state.rating }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="filterForks(1)">1 Fork</a>
            <a class="dropdown-item" @click="filterForks(2)">2 Forks</a>
            <a class="dropdown-item" @click="filterForks(3)">3 Forks</a>
            <a class="dropdown-item" @click="filterForks(4)">4 Forks</a>
            <a class="dropdown-item" @click="filterForks(5)">5 Forks</a>
          </div>
        </div>

        <div class="dropdown mr-5">
          <div class="btn btn-color dropdown-toggle"
               id="dropdownMenuButton"
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false"
               title="Filter By Difficulty"
          >
            {{ state.difficulty }}
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="filterDifficulty('Guinea Pig')">Guinea Pig</a>
            <a class="dropdown-item" @click="filterDifficulty('Piglet')">Piglet</a>
            <a class="dropdown-item" @click="filterDifficulty('Pig')">Pig</a>
            <a class="dropdown-item" @click="filterDifficulty('Hog')">Hog</a>
            <a class="dropdown-item" @click="filterDifficulty('Wild Boar')">Wild Boar</a>
          </div>
        </div>
        <div class="dropdown mr-5">
          <div class="btn btn-color dropdown-toggle"
               id="dropdownMenuButton"
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false"
               title="Filter By Difficulty"
          >
            {{ state.newState }}
          </div>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="filterState('Idaho')">Idaho</a>
            <a class="dropdown-item" @click="filterState('Oregon')">Oregon</a>
            <a class="dropdown-item" @click="filterState('Washington')">Washington</a>
            <a class="dropdown-item" @click="filterState('Nevada')">Nevada</a>
          </div>
        </div>
        <button class="btn btn-danger" @click="filterReset" v-show="state.filterBy.difficulty || state.filterBy.forks || state.filterBy.state">
          Clear Filter
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
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
      newState: 'State',
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
        state.rating = num + ' Forks'
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
    font-weight: bold;
}
</style>
