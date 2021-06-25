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
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
export default {
  setup() {
    const route = useRoute()
    onMounted(() =>
      accountService.getProfileChallenges(route.params.id),
    accountService.getUserAttempts(route.params.id)
    )
  }
}
</script>

<style>

</style>
