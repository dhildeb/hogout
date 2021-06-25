<template>
  <div class=" d-flex flex-column our-bg">
    <div class="card container ">
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
      <div class="row mb-3">
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
      <div class="row justify-content-center">
        <p><b>Difficulty: </b></p>
      </div>
      <div class="row justify-content-center">
        <p><b>User Rating: </b></p>
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
        <button @click="ITookChallenge" type="button" data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-primary btn-block">
          I TOOK ON THIS CHALLENGE
        </button>
      </div>
    </div>
    <div v-if="state.posts.length > 0" class="container">
      <Post v-for="p in state.posts" :key="p.id" :post="p" />
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade"
       id="exampleModalCenter"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalCenterTitle"
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
import Notification from '../utils/Notification'
import { attemptsService } from '../services/AttemptsService'

export default {
  setup() {
    const state = reactive({
      challenge: computed(() => AppState.activeChallenge),
      attempts: computed(() => AppState.attempts.filter(a => a.challengeId === state.challenge._id)),
      wins: computed(() => AppState.attempts.filter(a => a.challengeId === state.challenge._id && a.completed)),
      aveRatings: computed(() => AppState.reviewRatings),
      aveDifficulty: computed(() => AppState.difficultyRatings),
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
.our-bg{
  background-color: #E8E8E8;
}
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
