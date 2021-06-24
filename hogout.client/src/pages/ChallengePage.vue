<template>
  <ChallengeDesktop class="d-none d-sm-block" />
  <ChallengeMobile class="d-sm-none d-block" />
</template>

<script>
import { watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { challengesService } from '../services/ChallengesService'
import { attemptsService } from '../services/AttemptsService'
import { ratingsService } from '../services/RatingsService'
import Notification from '../utils/Notification'
export default {
  name: 'Challenge',
  setup() {
    const route = useRoute()
    watchEffect(async() => {
      try {
        if (route.name === 'Challenge') {
          await challengesService.getChallengeById(route.params.id)
          await attemptsService.getAllAttempts()
          await ratingsService.getDifficultyRatingsByChallengeId(route.params.id)
          await ratingsService.getReviewRatingsByChallengeId(route.params.id)
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
