<template>
  <div class="d-flex col-12 card main-display-challenge">
    <div class="row justify-content-center">
      <div class="col-12">
        <img class="card-img-top challenge-banner" :src="state.challenge.banner" alt="Profile Banner">
      </div>
    </div>
    <div class="row justify-content-center text-center pt-4">
      <div class="col-4 justify-content-center mb-5 ">
        <img class="rounded-circle db" :src="state.challenge.image" alt="Profile Image">
      </div>
      <div class="col-8">
        <div class="row title-challenge justify-content-center">
          <span>
            {{ state.challenge.restaurant }}, {{ state.challenge.state }}
          </span>
        </div>
        <div class="row justify-content-center text-center location-b">
          <button
            @click="openMaps"
            class="
              btn
              btn-primary
              my-2
              "
          >
            Find Location
          </button>
        </div>
        <div class="row justify-content-center align-items-center text-center rating-title">
          <span class="mr-3">
            <b class="text-center">User Rating: </b>
          </span>
          <div :title="state.aveRating">
            <img class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="" srcset="">

            <img v-if="state.aveRating > 1.5" class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="" srcset="">
            <img v-else class="icon-fork-desktop" src="../assets/img/emptyFork.png" alt="" srcset="">

            <img v-if="state.aveRating > 2.4" class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="" srcset="">
            <img v-else class="icon-fork-desktop" src="../assets/img/emptyFork.png" alt="" srcset="">

            <img v-if="state.aveRating > 3.4" class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="" srcset="">
            <img v-else class="icon-fork-desktop" src="../assets/img/emptyFork.png" alt="" srcset="">

            <img v-if="state.aveRating > 4.5" class="icon-fork-desktop" src="../assets/img/fullFork.png" alt="" srcset="">
            <img v-else class="icon-fork-desktop" src="../assets/img/emptyFork.png" alt="" srcset="">
          </div>
        </div>
        <div class="row justify-content-center piggies">
          <div title="Total Attempts" class=" d-flex align-items-center flex-wrap justify-content-center">
            <img class="icon-pig-desktop" src="../assets/img/pig-normal.png" alt="Pig face">
            <div class="d-flex align-items-center">
              <i class="mdi mdi-close"></i>
              <span class="m-0 score-text  text-wrap">
                {{ state.attempts.length }}
              </span>
            </div>
            <img class="icon-pig-desktop" src="../assets/img/pig-crown.png" alt="Crown Pig Face">
            <div class="d-flex align-items-center">
              <i class="mdi mdi-close"></i>
              <span class="m-0 score-text  center">
                {{ state.wins.length }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row d-flex justify-content-center" v-if="state.user.isAuthenticated">
    <div class="col-12 justify-content-center text-center">
      <button @click="ITookChallenge" data-toggle="modal" data-target="#challengeDesktopModal" class="btn btn-primary">
        <span class=" m-auto">

          I TOOK ON THIS CHALLENGE
        </span>
      </button>
    </div>
  </div>
  <div class="col-12 card">
    <div class="row">
      <div class="mb-2 col-12 justify-content-center text-center">
        <h1 class="rating-title">
          {{ state.challenge.restaurant }} {{ state.challenge.name }}
        </h1>
      </div>
      <div class="col-12 justify-content-center">
        <p class="difficulty-title">
          <b>Difficulty: </b>
          {{ difficulty }}
        </p>
      </div>
      <div class="col-12 mx-2">
        <h3 class="text-center ">
          Rules
        </h3>
        <p class="challenge-desc">
          {{ state.challenge.rules }}
        </p>
      </div>
      <div class="col-12 mx-2">
        <h3 class="text-center ">
          Rewards
        </h3>
        <p class="challenge-desc">
          {{ state.challenge.rewards }}
        </p>
      </div>
    </div>
  </div>

  <div class="col-12">
    <div class="row" v-if="state.user.isAuthenticated">
      <div class="col-12 d-flex justify-content-center">
        <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#review">
          Post A Review
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <u><h2>Reviews</h2></u>
      </div>
    </div>
  </div>
  <div class="col-12 justify-content-center" v-if="state.posts.length > 0">
    <Post v-for="p in state.posts" :key="p.id" :post="p" />
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
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-center">
          <h5 class="modal-title " id="exampleModalLongTitle">
            Way to HOG OUT!
          </h5>
        </div>
        <div class="modal-body d-flex justify-content-center">
          <h4>Choose your results!</h4>
        </div>
        <div class="modal-footer d-flex flex-column">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="createAttempt(true)">
            I Won the Challenge!
          </button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="createAttempt(false)">
            I Tried and Failed!
          </button>
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

export default {
  setup() {
    const state = reactive({
      challenge: computed(() => AppState.activeChallenge),
      attempts: computed(() => AppState.attempts),
      wins: computed(() => AppState.attempts.filter(a => a.completed)),
      aveRating: computed(() => reviewRatingAve(AppState.activeChallenge.id)),
      aveDifficulty: computed(() => AppState.difficultyRatings),
      posts: computed(() => AppState.posts),
      user: computed(() => AppState.user),
      newAttempt: {}
    })
    const difficulty = difficultyRatingAve(state.challenge.id)
    const review = reviewRatingAve(state.challenge.id)

    return {
      state,
      difficulty,
      review,
      openMaps() {
        window.location.href = `${state.challenge.location}${state.challenge.state}/`
      },
      createAttempt(result) {
        state.newAttempt.completed = result
        try {
          attemptsService.createAttempt(state.challenge.id, state.newAttempt)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
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
}
.card{
background-color: rgb(250, 245, 240);
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
  height: 4rem;
  padding-right: 2rem;
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
  margin-top: 1rem;
}
.min-100{
  min-height: 100vh;
}
</style>
