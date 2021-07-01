<template>
  <div id="desktop" class="container-fluid desktop-render">
    <div class="row justify-content-center">
      <ChallengeDesktop />
    </div>
  </div>

  <div class="container mobile-render">
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
import { likesService } from '../services/LikesService'
export default {
  name: 'Challenge',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await attemptsService.getAttemptsByChallengeId(route.params.id)
      await likesService.getAllPostLikes()
    }
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

@media screen and (max-width: 1049px) {
.desktop-render{
    display: none;
  }
}
@media screen and (min-width: 1050px) {
.mobile-render{
    display: none;
  }
}
</style>
