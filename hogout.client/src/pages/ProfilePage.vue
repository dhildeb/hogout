<template>
  <div class="container-fluid color">
    <MobileProfile :profile="state.profile" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { attemptsService } from '../services/AttemptsService'

export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      profile: computed(() => AppState.activeProfile)
    })
    onMounted(async() => {
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
.sidebar-fit{
  left:0
}
</style>
