<template>
  <div class="row p-0 my-0 justify-content-center d-none d-md-flex">
    <div class="col-10 col-md-8 col-lg-6 shadow p-0 click" @click="goThere">
      <img class="banner img-fluid rounded-top" :src="challenge.challenge.banner" alt="banner">
    </div>
  </div>
  <div class="row pb-2 justify-content-center">
    <div class="col-2 d-flex flex-column border rounded-bottom shadow d-flex bg-white p-0 py-2">
      <span>wins</span>
      <span>attempts</span>
    </div>
    <div class="col-10 col-md-8 col-lg-6 click border rounded-bottom shadow d-flex bg-white p-0 py-2" @click="goThere">
      <img class="img-fluid icon over-hang p-2" :src="challenge.challenge.image" alt="icon">
      <div class="d-flex flex-column w-100 px-2">
        <b class="p-1">{{ challenge.challenge.name }}</b>
        <em class="text-secondary">{{ challenge.challenge.state }}</em>
        <span class="row p-1 m-0 text-danger">
          <span class="col-12 col-md-5 p-0 pb-2 text-danger" title="">Difficulty: <em>{{ getDifficultyRating(challenge.challenge) }}</em></span>
          <div class="col-12 col-md-6 p-0 d-flex">
            <p>Rating: </p>
            <img src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-if="getReviewRating(challenge.challenge) > 1.5" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
            <img v-if="getReviewRating(challenge.challenge) > 2.4" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
            <img v-if="getReviewRating(challenge.challenge) > 3.4" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
            <img v-if="getReviewRating(challenge.challenge) > 4.5" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
export default {
  props: {
    challenge: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      attempts: computed(() => AppState.profileAttempts.filter(a => a.creatorId === route.params.id)),
      defeats: computed(() => AppState.profileAttempts.filter(a => a.completed === true)),
      challenge: computed(() => AppState.activeChallenge)
    })
    return {
      state,
      getReviewRating(data) {
        return reviewRatingAve(data.id)
      },
      getDifficultyRating(data) {
        return difficultyRatingAve(data.id)
      },
      goThere() {
        router.push({ name: 'Challenge', params: { id: state.challengeId } })
      }
    }
  }
}
</script>

<style>

</style>
