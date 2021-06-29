<template>
  <div class="d-flex container-fluid justify-content-center card">
    <div class=" row justify-content-center">
      <div class="col-12">
        <img class="card-img-top challenge-banner" :src="state.challenge.banner" alt="Profile Banner">
      </div>
      <div class="col-12 justify-content-center mb-5 pb-5">
        <img class="rounded-circle db" :src="state.challenge.image" alt="Profile Image">
      </div>

      <div class="col-12 justify-content-center text-center">
        <h4 class="title-challenge">
          {{ state.challenge.restaurant }}, {{ state.challenge.state }}
        </h4>
      </div>
      <div class="col-12 justify-content-center text-center">
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
      <div class="col-12 justify-content-center">
        <p class="rating-title">
          <b>User Rating: </b>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="row justify-content-center align-items-center">
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
      </div>
      <div title="Total Attempts" class="col-4 d-flex align-items-center justify-content-end">
        <img class="icon-pig-desktop" src="../assets/img/pig-normal.png" alt="Pig face">
        <i class="mdi mdi-close"></i>
        <p class="m-0">
          {{ state.attempts.length }}
        </p>
      </div>
      <div title="Total Wins" class="col-4 d-flex align-items-center">
        <img class="icon-pig-desktop" src="../assets/img/pig-crown.png" alt="Crown Pig Face">
        <i class="mdi mdi-close"></i>
        <p class="m-0">
          {{ state.wins.length }}
        </p>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 justify-content-center text-center">
        <button @click="ITookChallenge" data-toggle="modal" data-target="#challengeDesktopModal" class="btn btn-primary location-b">
          <span class="button-text m-auto">

            I TOOK ON THIS CHALLENGE
          </span>
        </button>
      </div>
    </div>
  </div>
  <div class="container card">
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

  <div class="container">
    <CreatePost />

    <div class="row justify-content-center" v-if="state.posts.length > 0">
      <Post v-for="p in state.posts" :key="p.id" :post="p" />
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade bg-transparent"
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
  min-width: 7rem;
  min-height: 7rem;
  height: 30vw;
  width: 30vw;
  top: -17vw;
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
  max-height: 25vw;
}
.location-b{
  min-width: 80vw;

  min-height: 13vw;

}
.rating-title{
  font-size: 50px;
}
.title-challenge{
  font-size: 90px;
  margin-left: 5rem;
}
.difficulty-title{
  font-size: 30px;
}
.button-text{
  font-size: 45px;
}
.icon-fork-desktop{
  height: 13rem;
  padding-right: 2rem;
}
.icon-pig-desktop{
  height: 22rem;
  margin: 2rem;
  padding-bottom: 4rem;
}
.challenge-desc{
  font-size: 1.4rem;
}

</style>
