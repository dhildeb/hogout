<template>
  <div class="card container">
    <div class="row">
      <img class="card-img-top" :src="state.challenge.banner" alt="Card image cap">
    </div>
    <div class="row justify-content-center prof-row">
      <img class="rounded-circle ab" :src="state.challenge.image" alt="" srcset="">
    </div>
    <div class="row sep"></div>
    <div class="card-body row">
      <h5 class="card-title">
        {{ state.challenge.restaurant }}
      </h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

"_id": "60d377d07334872428ebbbee",
        "name": "1lb Challenge",
        "restaurant": "Big Juds",
        "rewards": "You will have the privilege to purchase a special T-shirt to commemorate your success. You will get your picture taken and added to the wall of fame if you manage to complete the challenge",
        "rules": "Consume the entire 1lb burger, fries, and drink – Fries may be substituted for Tots. The meal is NOT free even if you complete the challenge. You have up to 30 minutes to complete the challenge You may not leave the table during the challenge",
        "location": "https://www.google.com/search?safe=active&rlz=1C1ONGR_enUS946US947&sxsrf=ALeKk00C-BqRVhsi8Aq1eMjvCNcTiTkllw:1624469760226&q=big+juds+locations&sa=X&ved=2ahUKEwiIlYa4pa7xAhWTvZ4KHUTsA-sQuzF6BAgDEAI&biw=1920&bih=937&dpr=1",
        "image": "http://www.bigjuds.com/wp-content/uploads/2020/03/bigjuds-world-famous-burgers.png",
        "banner": "http://www.bigjuds.com/images/best-hamburger-boise.jpg",
        "creatorId": "60d37700352e449fd6b4af82",
        "__v": 0,
        "state": "idaho"

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, watchEffect } from '@vue/runtime-core'
import { challengesService } from '../services/ChallengesService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      challenge: computed(() => AppState.activeChallenge)
    })
    watchEffect(async() => {
      try {
        if (route.name === 'Challenge') {
          await challengesService.getChallengeById(route.params.id)
        }
      } catch (error) {
        Notification.toast(error.message, 'error')
      }
    })
    return {
      state
    }
  }
}
</script>

<style>
.ab{
  position: absolute;
  min-height: 30vw;
  min-width: 30vw;
  top: -15vw;
}
.prof-row{
position: relative;
}

.sep{
  height: 10vw;
}
</style>
