<template>
  <div class="row p-0 m-0 justify-content-center d-none d-md-flex">
    <div class="col-10 col-md-8 col-lg-6 p-0">
      <img class="banner img-fluid" :src="challenge.banner" alt="banner">
    </div>
  </div>
  <div class="row pb-2 justify-content-center">
    <div class="col-10 col-md-8 col-lg-6 click border rounded-lg shadow d-flex bg-white p-0 py-2" @click="goThere">
      <img class="img-fluid icon over-hang p-2" :src="challenge.image" alt="icon">
      <div class="d-flex flex-column w-100 px-2">
        <b class="p-1">{{ challenge.name }}</b>
        <em class="text-secondary">{{ challenge.state }}</em>
        <span class="p-1 text-danger">
          <span class="text-danger" title="">Difficulty: <em>{{ getDifficultyRating(challenge) }}</em></span>
          <div class="d-flex">
            <p>Rating: </p>
            <span class="mdi mdi-star pl-2"></span>
            <span v-if="getReviewRating(challenge) > 1.5" class="mdi mdi-star"></span>
            <span v-if="getReviewRating(challenge) > 2.4" class="mdi mdi-star"></span>
            <span v-if="getReviewRating(challenge) > 3.4" class="mdi mdi-star"></span>
            <span v-if="getReviewRating(challenge) > 4.5" class="mdi mdi-star"></span>
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
</style>
