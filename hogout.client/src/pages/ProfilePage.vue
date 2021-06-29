<template>
  <div class="container-fluid color">
    <MobileProfile :profile="state.profile" />
  </div>
</template>

<script>
import { computed, watchEffect, reactive, onMounted } from '@vue/runtime-core'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { attemptsService } from '../services/AttemptsService'
// import MobileProfile from '../components/MobileProfile.vue'
// import 'materialize-css/dist/css/materialize.css'

export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      profile: computed(() => AppState.activeProfile)
    })
    const route = useRoute()
    watchEffect(async() => {
      await accountService.getProfileChallenges(route.params.id)
      await accountService.getProfile(route.params.id)
      await accountService.getUserAttempts(route.params.id)
      await attemptsService.getAllAttempts()
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
.color{
  background-color: #e8e8e8;
}
</style>
