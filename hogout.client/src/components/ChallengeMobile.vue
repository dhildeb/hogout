<template>
  <div class="row mx-1">
    <div class=" col card pt-2">
      <img class="card-img-top" :src="state.challenge.banner" alt="Profile Banner">

      <div class="row justify-content-center rel">
        <img class="rounded-circle ab" :src="state.challenge.image" alt="Profile Image">
      </div>
      <div class="row sep"></div>

      <div class="mt-4 mb-2 row justify-content-center">
        <h4 class="">
          <b>
            {{ state.challenge.name }}
          </b>
        </h4>
      </div>
      <div class="row justify-content-center">
        <h6>{{ state.challenge.restaurant }}, {{ state.challenge.state }}</h6>
      </div>
      <div class="row justify-content-center">
        <button
          @click="openMaps"
          class="
              btn
              btn-primary

              my-2"
        >
          Find Location
        </button>
      </div>
      <div class="row mb-3">
        <div title="Total Attempts" class="col d-flex align-items-center justify-content-end mx-2">
          <img class="icon-pig" src="../assets/img/pig-normal.png" alt="Pig face">
          <i class="mdi mdi-close"></i>
          <p class="m-0">
            {{ state.attempts.length }}
          </p>
        </div>
        <div title="Total Wins" class="col d-flex align-items-center mx-2">
          <img class="icon-pig" src="../assets/img/pig-crown.png" alt="Crown Pig Face">
          <i class="mdi mdi-close"></i>
          <p class="m-0">
            {{ state.wins.length }}
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <p><b>Difficulty: </b></p>
        <div>{{ state.aveDifficulty }}</div>
      </div>
      <div class="row justify-content-center m-0">
        <p><b>User Rating: </b></p>
      </div>
      <div class="row justify-content-center align-items-center">
        <div :title="state.aveRating">
          <img class="icon-fork" src="../assets/img/fullFork.png" alt="" srcset="">

          <img v-if="state.aveRating > 1.5" class="icon-fork" src="../assets/img/fullFork.png" alt="" srcset="">
          <img v-else class="icon-fork" src="../assets/img/emptyFork.png" alt="" srcset="">

          <img v-if="state.aveRating > 2.4" class="icon-fork" src="../assets/img/fullFork.png" alt="" srcset="">
          <img v-else class="icon-fork" src="../assets/img/emptyFork.png" alt="" srcset="">

          <img v-if="state.aveRating > 3.4" class="icon-fork" src="../assets/img/fullFork.png" alt="" srcset="">
          <img v-else class="icon-fork" src="../assets/img/emptyFork.png" alt="" srcset="">

          <img v-if="state.aveRating > 4.5" class="icon-fork" src="../assets/img/fullFork.png" alt="" srcset="">
          <img v-else class="icon-fork" src="../assets/img/emptyFork.png" alt="" srcset="">
        </div>
      </div>
      <div class="row mx-2">
        <h3>
          Rules
        </h3>
        <p>{{ state.challenge.rules }}</p>
      </div>
      <div class="row mx-2">
        <h3>
          Rewards
        </h3>
        <p>{{ state.challenge.rewards }}</p>
      </div>
      <div class="row justify-content-center my-3">
        <button type="button" data-toggle="modal" data-target="#challenge" class="btn btn-primary">
          I TOOK ON THIS CHALLENGE
        </button>
      </div>
    </div>
    <div class="col-12">
      <div class="row">
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
      <div v-if="state.posts.length > 0" class="col-12">
        <Post v-for="p in state.posts" :key="p.id" :post="p" />
      </div>
    </div>

    <!-- Modal Taking On Challenge -->
    <div class="modal fade bg-transparent min-100"
         id="challenge"
         tabindex="-1"
         role="dialog"
         aria-labelledby="challengeTitle"
         aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content ">
          <div class="modal-header d-flex justify-content-center">
            <h5 class="modal-title " id="exampleModalLongTitle">
              Way to HOG OUT!
            </h5>
          </div>
          <div class="modal-body d-flex justify-content-center text-center">
            <h4>Choose your results!</h4>
          </div>

          <button type="button" class="btn btn-secondary  my-1" data-dismiss="modal" @click="createAttempt(true)">
            I Won the Challenge!
          </button>
          <button type="button" class="btn btn-primary  my-1 mt-2" data-dismiss="modal" @click="createAttempt(false)">
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
import Notification from '../utils/Notification'
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
import { attemptsService } from '../services/AttemptsService'

export default {
  setup() {
    const state = reactive({
      aveDifficulty: computed(() => difficultyRatingAve(AppState.activeChallenge.id)),
      aveRating: computed(() => reviewRatingAve(AppState.activeChallenge.id)),
      challenge: computed(() => AppState.activeChallenge),
      attempts: computed(() => AppState.attempts),
      wins: computed(() => AppState.attempts.filter(a => a.completed)),
      posts: computed(() => AppState.posts),
      newAttempt: {}
    })

    return {
      state,
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
.vw-100{
  width: 100vw;
}

.ab{
  position: absolute;
  min-width: 10rem;
  min-height: 10rem;
  height: 30vw;
  width: 30vw;
  top: -15vw;
}
.rel{
position: relative;
}

.sep{

  height: 11vw;
}

.icon-pig{
  width: 3.5rem;
  margin-bottom: 1rem;
}
.icon-fork{
    width: 1.3rem;
margin-right: 5px;
margin-left: 5px;
}

.min-100{
  min-height: 100vh;
}

.max-width{
  max-width: 100%;
  z-index: 10;
}
</style>
