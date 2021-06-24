<template>
  <div class="row py-3 justify-content-center bg-white">
    <div class="col-10 border rounded shadow d-flex bg-light" @click="goThere">
      <img class="img-fluid p-2" :src="challenge.image" alt="">
      <div class="d-flex flex-column w-100">
        <b class="p-1">{{ challenge.name }}</b>
        <em class="p-1">{{ challenge.state }}</em>
        <div class="d-flex justify-content-between">
          <span>reviews: {{ getReviewRating(challenge) }}/5</span>
          <span>difficulty: {{ getDifficultyRating(challenge) }}/5</span>
        </div>
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
.img-fluid{
  min-height: 100px;
  max-width: 100px;
}
</style>
