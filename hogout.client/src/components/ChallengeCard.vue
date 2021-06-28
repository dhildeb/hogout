<template>
  <div class="row p-0 my-0 justify-content-center d-none d-md-flex">
    <div class="col-10 col-md-8 col-lg-6 shadow p-0 click" @click="goThere">
      <img class="banner img-fluid rounded-top" :src="challenge.banner" alt="banner">
    </div>
  </div>
  <div class="row pb-2 justify-content-center">
    <div class="col-10 col-md-8 col-lg-6 click border rounded-bottom shadow d-flex bg-white p-0 py-2" @click="goThere">
      <img class="img-fluid icon over-hang p-2" :src="challenge.image" alt="icon">
      <div class="d-flex flex-column w-100 px-2">
        <b class="p-1">{{ challenge.name }}</b>
        <em class="text-secondary">{{ challenge.state }}</em>
        <span class="row p-1 m-0 text-danger">
          <span class="col-12 col-md-5 p-0 pb-2 text-danger" title="">Difficulty: <em>{{ getDifficultyRating(challenge) }}</em></span>
          <div class="col-12 col-md-6 p-0 d-flex">
            <p>Rating: </p>
            <img src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-if="getReviewRating(challenge) > 1.5" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
            <img v-if="getReviewRating(challenge) > 2.4" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
            <img v-if="getReviewRating(challenge) > 3.4" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
            <img v-if="getReviewRating(challenge) > 4.5" src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
            <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
import { useRouter } from 'vue-router'
export default {
  props: {
    challenge: { type: Object, required: true }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      challengeId: props.challenge.id
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
.icon{
  max-width: 100px;
  object-fit: scale-down;
}

.banner{
  height: 160px;
  width: fit-content;
}

.click{
  cursor: pointer;
}
.icon-fork{
  width: .7rem;
  margin-right: 5px;
  margin-left: 5px;
}
</style>
