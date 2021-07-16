<template>
  <SideBar v-if="state.user.isAuthenticated" />
  <div class="col-12">
    <div :class="{
           'perfectWidth': state.user.isAuthenticated,
           'perfectMargin': !state.user.isAuthenticated
         }"
         class="row card bg-yellow main-display-challenge pt-2 mt-5"
    >
      <div class="col-12">
        <img class="card-img-top challenge-banner" :src="state.challenge.banner" @error="state.challenge.banner='/img/default-burger.e0b93deb.jpg'" alt="Profile Banner">
      </div>

      <div class="col-12 d-flex justify-content-center text-center pt-4">
        <div class="col-4 justify-content-center pl-5 ">
          <img class="rounded-circle db profColor" :src="state.challenge.image" @error="state.challenge.image='/img/burgerdefaulticon.55d12ebb.png'" alt="Profile Image">
          <div class="row d-block">
            <div title="Total Attempts" class="col d-flex align-items-center justify-content-start piggies ml-5 ">
              <img class="icon-pig-desktop" src="../assets/img/pig-normal.png" alt="Pig face">
              <i class="mdi mdi-close"></i>
              <p class="m-0">
                {{ state.attempts.length }}
              </p>
            </div>
            <div title="Total Wins" class="col d-flex align-items-center ml-5">
              <img class="icon-pig-desktop" src="../assets/img/pig-crown.png" alt="Crown Pig Face">
              <i class="mdi mdi-close"></i>
              <p class="m-0">
                {{ state.wins.length }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-9">
          <div class="row title-challenge justify-content-center mx-5">
            <span>
              {{ state.challenge.restaurant }}, {{ state.challenge.state }}
            </span>
          </div>
          <div class="row justify-content-center text-center location-b">
            <button
              @click="openMaps"
              class="
              btn
              btn-color
              my-2
              "
            >
              Find Location
            </button>
          </div>
          <div class="row justify-content-center align-items-center text-center rating-title">
            <div :title="'User Rating: '+state.aveRating">
              <img class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="fork" srcset="">

              <img v-if="state.aveRating > 1.5" class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="fork" srcset="">
              <img v-else class="icon-fork-desktop" src="../assets/img/emptyFork.png" alt="empty fork" srcset="">

              <img v-if="state.aveRating > 2.4" class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="fork" srcset="">
              <img v-else class="icon-fork-desktop" src="../assets/img/emptyFork.png" alt="empty fork" srcset="">

              <img v-if="state.aveRating > 3.4" class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="fork" srcset="">
              <img v-else class="icon-fork-desktop" src="../assets/img/emptyFork.png" alt="empty fork" srcset="">

              <img v-if="state.aveRating > 4.5" class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="fork" srcset="">
              <img v-else class="icon-fork-desktop" src="../assets/img/emptyFork.png" alt="empty fork" srcset="">
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="mb-2 col-12 justify-content-center text-center pt-3 border-bottom">
            <h1 class="rating-title">
              <b>
                {{ state.challenge.name }}
              </b>
            </h1>
          </div>
          <div class="col-12 justify-content-center mx-2">
            <p class="difficulty-title text-danger">
              <b class="text-danger">Difficulty: </b>
              {{ state.aveDifficulty }}
            </p>
          </div>
          <div class="col-12 mx-2">
            <h3 class=" ">
              Rules
            </h3>
            <p class="challenge-desc">
              {{ state.challenge.rules }}
            </p>
          </div>
          <div class="col-12 mx-2">
            <h3 class=" ">
              Rewards
            </h3>
            <p class="challenge-desc">
              {{ state.challenge.rewards }}
            </p>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center" v-if="state.user.isAuthenticated">
        <div class="col-12 justify-content-center text-center">
          <button @click="ITookChallenge" data-toggle="modal" data-target="#challengeDesktopModal" class="btn btn-color">
            <span class=" m-auto">
              I TOOK ON THIS CHALLENGE
            </span>
          </button>
        </div>
      </div>
    </div>

    <div :class="{
           'perfectWidth': state.user.isAuthenticated,
           '': !state.user.isAuthenticated
         }"
         class="row justify-content-center"
    >
      <u><h2>Reviews</h2></u>
    </div>
    <div class="row perfectWidth" v-if="state.user.isAuthenticated">
      <div class="col-12 d-flex justify-content-center">
        <button class="btn btn-color" type="button" data-toggle="modal" data-target="#review">
          Post A Review
        </button>
      </div>
    </div>

    <div class="col-12 justify-content-center " v-if="state.posts.length > 0">
      <Post :class="{
              'perfectWidth': state.user.isAuthenticated,
              'perfectMargin': !state.user.isAuthenticated
            }"
            v-for="p in state.posts"
            :key="p.id"
            :post="p"
      />
    </div>

    <!-- Modal -->
    <div class="modal fade bg-transparent min-100"
         id="challengeDesktopModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="challengeDesktopModalTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modal-pos">
          <div class="modal-header d-flex justify-content-center">
            <h2 class="modal-title " id="exampleModalLongTitle">
              Way to HOG OUT!
            </h2>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <h4>Choose your results!</h4>
          </div>
          <div class="modal-footer d-flex flex-column">
            <button type="button" class="btn btn-pink" data-dismiss="modal" @click="createAttempt(true)">
              I Won the Challenge!
            </button>
            <button type="button" class="btn btn-color" data-dismiss="modal" @click="createAttempt(false)">
              I Tried and Failed!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
import { attemptsService } from '../services/AttemptsService'
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      aveDifficulty: computed(() => difficultyRatingAve(route.params.id)),
      aveRating: computed(() => reviewRatingAve(route.params.id)),
      challenge: computed(() => AppState.activeChallenge),
      attempts: computed(() => AppState.attempts),
      wins: computed(() => AppState.attempts.filter(a => a.completed)),
      posts: computed(() => AppState.posts),
      user: computed(() => AppState.user),
      newAttempt: {}
    })

    return {
      state,
      openMaps() {
        try {
          window.open(
            `${state.challenge.location}+${state.challenge.state}/`,
            '_blank'
          )
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      createAttempt(result) {
        state.newAttempt.completed = result
        try {
          attemptsService.createAttempt(state.challenge.id, state.newAttempt)
          Notification.toast(state.newAttempt.completed ? 'Way to Hog Out!' : 'Better luck next time', 'success')
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.profColor{
  background-color: #faf5f0;
}

.perfectWidth{
  margin-left: calc(3vw + 280px);
  margin-right: 3vw ;
}
.db{
  position: absolute;
  height: 20vw;
  width: 20vw;
  top: -13vw;
  left: 6vw;

}
.prof-row{
position: relative;
}

.sep{
  min-height: 44px;
  height: 10vw;
}
.challenge-banner{
  max-height: 17vw;
  object-fit: cover;
}
.btn-pink{
      background-color: #ebc3ec;
    border-color: #1f312b;
    border-width: medium;
    color: #1f312b;
    font-weight: bold;
}
.btn-color{
  background-color: #7fa597;
    border-color: #547066;
    border-width: medium;
    color: #2c3034;
    font-weight: bold;
}

.rating-title{
  font-size: 1.7rem;
}
.title-challenge{
  font-weight: bold;
  font-size: 2.1rem;
}
.difficulty-title{
  font-size: 30px;
}

.icon-fork-desktop{
  height: 5rem;
  padding-right: 1rem;
}
.icon-pig-desktop{
  height: 5rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
.challenge-desc{
  font-size: 1.4rem;
}
.score-text{
  font-size: 2rem;
}

.piggies{
  margin-top: 7rem;
}
.min-100{
  min-height: 100vh;
}
.modal-pos{
  left: 135px;
}
.perfectMargin{
  margin-left: 17vw;
  margin-right: 17vw;
}
</style>
