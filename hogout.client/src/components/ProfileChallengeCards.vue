<template>
  <div class="col-12 m-auto d-flex shadow">
    <div class="col-4 justify-content-start text-center">
      resturant pic
      <!-- <img src="" alt=""> -->
    </div>
    <div class="col-4 justify-content-center text-left">
      <h6>challenge title</h6>
      <p>location</p>
      <p>difficulty</p>
      <p>rating</p>
    </div>
    <div class="col-4 text-center">
      medal attempts
      medal wins
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      attempts: computed(() => AppState.profileAttempts.filter(a => a.creatorId === route.params.id)),
      defeats: computed(() => AppState.profileAttempts.filter(a => a.completed === true))
    })
    onMounted(() =>
      accountService.getProfileChallenges(route.params.id),
    accountService.getUserAttempts(route.params.id)
    )
    return {
      state
    }
  }
}
</script>

<style>

</style>
