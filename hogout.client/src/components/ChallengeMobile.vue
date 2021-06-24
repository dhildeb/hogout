<template>
  <div class="card container">
    <div class="row">
      <img class="card-img-top" :src="state.challenge.banner" alt="Profile Banner">
    </div>
    <div class="row justify-content-center prof-row">
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
              btn-block
              my-2"
      >
        Find Location
      </button>
    </div>
    <div class="row">
      <div class="col d-flex align-items-center justify-content-end mx-2">
        <img class="rounded-circle" src="https://placebear.com/50/50" alt="">
        <i class="mdi mdi-close"></i>
        <p class="m-0">
          {{ state.attempts.length }}
        </p>
      </div>
      <div class="col d-flex align-items-center mx-2">
        <img class="rounded-circle" src="https://placebear.com/50/50" alt="">
        <i class="mdi mdi-close"></i>
        <p class="m-0">
          {{ state.wins.length }}
        </p>
      </div>
    </div>
    <div class="row">
      <p><b>Difficulty:</b></p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'

export default {
  setup() {
    const state = reactive({
      challenge: computed(() => AppState.activeChallenge),
      attempts: computed(() => AppState.attempts.filter(a => a.challengeId === state.challenge._id)),
      wins: computed(() => AppState.attempts.filter(a => a.challengeId === state.challenge._id && a.completed)),
      rating: computed(() => AppState.reviewRatings),
      difficulty: computed(() => AppState.difficultyRatings)
    })

    return {
      state,
      openMaps() {
        window.location.href = `${state.challenge.location}${state.challenge.state}/`
      }
    }
  }
}
</script>

<style>
.ab{
  position: absolute;
  min-width: 7rem;
  min-height: 7rem;
  height: 30vw;
  width: 30vw;
  top: -15vw;
}
.prof-row{
position: relative;
}

.sep{
  min-height: 44px;
  height: 10vw;
}
</style>
