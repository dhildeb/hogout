<template>
  <div class="container">
    <div class="row bg-light">
      <div class="card">
        <img class="card-img-top" src="" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">
            Card title
          </h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed, watchEffect } from '@vue/runtime-core'
import { challengesService } from '../services/ChallengesService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    watchEffect()(() => {
      challengesService.getChallengeById(route.params.id)
    })
    const state = reactive({
      challenge: computed(() => AppState.activeChallenge)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
