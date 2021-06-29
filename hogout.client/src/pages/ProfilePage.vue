<template>
  <div class="d-none d-sm-block container-fluid">
    <div class="row">
      <div class="col-3 pl-0">
        <SideBar />
      </div>
      <div class="col-8 justify-content-center">
        <DesktopProfile :profile="state.profile" />
      </div>
    </div>
  </div>

  <div class="container-fluid color d-sm-none d-block">
    <MobileProfile :profile="state.profile" />
  </div>
</template>

<script>
import { computed, watchEffect, reactive } from '@vue/runtime-core'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { attemptsService } from '../services/AttemptsService'
// import MobileProfile from '../components/MobileProfile.vue'
// import 'materialize-css/dist/css/materialize.css'

export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      profile: computed(() => AppState.activeProfile)
    })
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
.sidebar-fit{
  left:0
}
</style>
