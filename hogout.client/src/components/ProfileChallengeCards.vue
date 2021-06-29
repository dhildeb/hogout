<template>
  <div class="row pb-2 justify-content-center">
    <div class="col-10 click border rounded-bottom shadow d-flex bg-white p-0 py-2 zoom" @click="goThere">
      <img class="banner img-fluid rounded-top" :src="challenge.challenge.banner" alt="banner">
      <img class="img-fluid icon over-hang p-2" :src="challenge.challenge.image" alt="icon">
      <div class="d-flex flex-column w-100 px-2">
        <b class="p-1">{{ challenge.challenge.name }}</b>
        <em class="text-secondary">{{ challenge.challenge.state }}</em>
        <span class="row p-1 m-0 text-danger">
          <span class="col-12 p-0 pb-2 text-danger" title="">Difficulty: <em>{{ getDifficultyRating(challenge.challenge) }}</em></span>
          <div class="col-10 p-0 d-flex">
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
    <div class="col-sm-1"></div>
    <div class="col-10 col-sm-1 challenge-stats d-flex flex-column-md justify-content-around border rounded-bottom shadow bg-white">
      <!-- options tab -->
      <div class="dropdown click options position-absolute"
           id="dropdownMenuButton"
           data-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded="false"
           title="options"
           v-if="state.profileId === state.account.id"
      >
        <h1>...</h1>
      </div>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button class="text-danger dropdown-item" @click="deleteAttempt">
          Remove Attempt
        </button>
      </div>
      <!-- end of options tab -->
      <span>
        <img class="icon-pig" title="Challenge Wins" src="../assets/img/pig-crown.png" alt="">
        X {{ state.wins.length }}</span>
      <span>
        <img class="icon-pig" title="Challenge Attempts" src="../assets/img/pig-normal.png" alt="">
        X {{ state.attempts.length }}</span>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
import { attemptsService } from '../services/AttemptsService'
export default {
  props: {
    challenge: { type: Object, required: true }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      challenge: computed(() => AppState.activeChallenge),
      attempts: computed(() => AppState.attempts.filter(a => a.creatorId === route.params.id && a.challengeId === props.challenge.challenge._id)),
      wins: computed(() => AppState.attempts.filter(a => a.completed && a.creatorId === route.params.id && a.challengeId === props.challenge.challenge._id)),
      profileId: computed(() => route.params.id),
      account: computed(() => AppState.account)
    })
    return {
      state,
      getReviewRating(data) {
        return reviewRatingAve(data._id)
      },
      getDifficultyRating(data) {
        return difficultyRatingAve(data._id)
      },
      goThere() {
        router.push({ name: 'Challenge', params: { id: props.challenge.challenge._id } })
      },
      async deleteAttempt() {
        await attemptsService.deleteAttempt(props.challenge.challenge._id)
      }
    }
  }
}
</script>

<style scoped>
.icon-fork{
  width: .5rem;
  height: 2.25rem;
  margin-right: 5px;
  margin-left: 5px;
}
.icon-pig{
  width: 3.5rem;
  margin-bottom: 1rem;
}
.banner{
  width: fit-content;
  object-fit: cover;
}
.options{
  right: 8px;
  top: -22px;
}
.zoom:hover{
  transform: scale(1.1);
  transition: all .25s linear;
}

@media screen and (min-width: 576px){

.challenge-stats{
  min-width: 120px;
}
.flex-column-md{
flex-direction: column;
}
}
</style>
