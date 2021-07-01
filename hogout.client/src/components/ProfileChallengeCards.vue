<template>
  <div class="row pb-2 justify-content-center">
    <div class="col-xl-6 col-md-8 col-sm-6 col-10 click border rounded-bottom shadow d-flex bg-yellow p-0 py-2 zoom card bg-white">
      <div class=" bg-white card-header">
        <div class="dropdown click options position-absolute"
             id="dropdownMenuButton"
             data-toggle="dropdown"
             aria-haspopup="true"
             aria-expanded="false"
             title="options"
             v-if="state.profileId === state.account.id"
        >
          <h1 class="dots">
            ...
          </h1>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button class="text-danger dropdown-item" @click="deleteAttempt">
              Remove Attempt
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-5"></div>
          <div class="col-sm-4">
            <h5 class="pl-3" @click="goThere">
              {{ challenge.challenge.name }}
            </h5>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>

      <div class="card-body bg-white justify-content-md-around" @click="goThere">
        <div class="row">
          <div class="col-3">
            <img class="img-fluid icon over-hang" :src="challenge.challenge.image" alt="icon">
          </div>
          <div class="justify-content-between d-flex col-3">
            <h6 class="text-secondary font-italic">
              State: {{ challenge.challenge.state }}
            </h6>
          </div>
          <div class="text-center d-flex forks col-3" title="Rating">
            <img src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="fork">
            <img v-if="getReviewRating(challenge.challenge) > 1.5" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="fork">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="empty fork">
            <img v-if="getReviewRating(challenge.challenge) > 2.4" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="fork">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="empty fork">
            <img v-if="getReviewRating(challenge.challenge) > 3.4" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="fork">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="empty fork">
            <img v-if="getReviewRating(challenge.challenge) > 4.5" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="fork">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="empty fork">
          </div>
          <div class="col-3 text-center p-0">
            <h6 class="text-danger font-italic">
              Difficulty: {{ getDifficultyRating(challenge.challenge) }}
            </h6>
          </div>
        </div>
      </div>
      <div class="card-footer bg-white">
        <div class="justify-content-around d-flex">
          <div>
            <img class="icon-pig" title="Challenge Wins" src="../assets/img/pig-crown.png" alt="pig-crown">
            X {{ state.wins.length }}
          </div>
          <div>
            <img class="icon-pig" title="Challenge Attempts" src="../assets/img/pig-normal.png" alt="pig">
            X {{ state.attempts.length }}
          </div>
        </div>
      </div>
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
        try {
          await attemptsService.deleteAttempt(props.challenge.challenge._id)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.icon{
  max-width:-webkit-fill-available;
  object-fit: scale-down;
}
.dots{
  padding-top: 1.25rem;
}
.click{
  cursor: pointer;
}
.icon-fork{
  width: .5rem;
  height: 2.25rem;
  margin-right: 5px;
  margin-left: 5px;
}
.move{
  margin-left: 7rem;
  font-size: 16px;
}
.move-more{
    color: red;
  margin-left: 6rem;
  font-size: 16px;
}
.challenge-title{
  padding-right: 10rem;
}
.icon-pig{
  width: 3.5rem;
  margin-bottom: 1rem;
}
.forks{
  padding-top: 4rem;
}
.banner{
  height: 160px;
  min-width: 50%;
  max-width: 50%;
  width: fit-content;
  object-fit: contain;
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
