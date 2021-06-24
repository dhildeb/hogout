<template>
  <router-link :to="{name: 'Challenge', params: {id: state.challengeId}}">
    <div class="row py-3 justify-content-center bg-white">
      <div class="col-10 border rounded shadow d-flex bg-light">
        <img class="img-fluid p-2" :src="challenge.image" alt="">
        <div class="d-flex flex-column">
          <b class="p-1">{{ challenge.name }}</b>
          <em class="p-1">{{ challenge.state }}</em>
          <div>
            <span>{{ getReviewRating(challenge) }}</span>
            <span>{{ getDifficultyRating(challenge) }}</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
export default {
  props: {
    challenge: { type: Object, required: true }
  },
  setup(props) {
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
