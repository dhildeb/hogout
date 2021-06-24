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
      <div class="col">
        <img class="rounded-circle" src="https://placebear.com/50/50" alt="">
        <p>{{ state.attempt }}</p>
      </div>
      <div class="col">
        <img class="rounded-circle" src="https://placebear.com/50/50" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, watchEffect } from '@vue/runtime-core'
import { challengesService } from '../services/ChallengesService'
import { attemptsService } from '../services/AttemptsService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      challenge: computed(() => AppState.activeChallenge),
      attempt: computed(() => AppState.attempts.filter(a => a.challengeId === state.challenge._id))
    })
    watchEffect(async() => {
      try {
        if (route.name === 'Challenge') {
          await challengesService.getChallengeById(route.params.id)
          await attemptsService.getAllAttempts()
        }
      } catch (error) {
        Notification.toast(error.message, 'error')
      }
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
