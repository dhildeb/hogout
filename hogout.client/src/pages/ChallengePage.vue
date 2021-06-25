<template>
  <div class="d-sm-block justify-content-center  d-none">
    <ChallengeDesktop />
  </div>
  <div class="d-sm-none d-block">
    <ChallengeMobile />
  </div>
</template>

<script>
import { onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { challengesService } from '../services/ChallengesService'
import { attemptsService } from '../services/AttemptsService'
import { ratingsService } from '../services/RatingsService'
import Notification from '../utils/Notification'
import { postsService } from '../services/PostsService'
export default {
  name: 'Challenge',
  setup() {
    const route = useRoute()
    onMounted(async() =>
      await attemptsService.getAttemptsByChallengeId(route.params.id)
    )
    watchEffect(async() => {
      try {
        if (route.name === 'Challenge') {
          await challengesService.getChallengeById(route.params.id)
          await ratingsService.getDifficultyRatingsByChallengeId(route.params.id)
          await ratingsService.getReviewRatingsByChallengeId(route.params.id)
          await postsService.getPostsByChallengeId(route.params.id)
        }
      } catch (error) {
        Notification.toast(error.message, 'error')
      }
    })
  }
}
</script>

<style>
</style>
