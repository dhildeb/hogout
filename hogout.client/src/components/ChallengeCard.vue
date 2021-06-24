<template>
  <div class="row py-3 justify-content-center bg-white">
    <div class="col-10 border rounded shadow d-flex bg-light">
      <img class="img-fluid p-2" :src="challenge.image" alt="">
      <div class="d-flex flex-column">
        <b class="p-1">{{ challenge.name }}</b>
        <em class="p-1">{{ challenge.state }}</em>
        <div>
          <span>{{ state.difficulty }}</span>
          <span>{{ state.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { ratingsService } from '../services/RatingsService'
export default {
  props: {
    challenge: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      difficulty: computed(() => {
        let totalRatings = 0
        let totalVotes = 0
        AppState.difficultyRatings.forEach(d => {
          if (d.challengeId === props.challenge.id) {
            totalRatings += d.rating
            totalVotes++
          }
        })
        return totalRatings / totalVotes
      }),
      rating: computed(() => {
        let totalRatings = 0
        let totalVotes = 0
        AppState.reviewRatings.forEach(r => {
          if (r.challengeId === props.challenge.id) {
            totalRatings += r.rating
            totalVotes++
          }
        })
        return totalRatings / totalVotes
      })
    })
    watchEffect(() => {
      AppState.difficultyRatings = ratingsService.getDifficultyRatings()
      // AppState.reviewRatings = ratingsService.getReviewRatings()
    })
    return {
      state
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
