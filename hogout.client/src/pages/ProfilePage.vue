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
// import MobileProfile from '../components/MobileProfile.vue'
// import 'materialize-css/dist/css/materialize.css'

export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      profile: computed(() => AppState.activeProfile)
    })
    const route = useRoute()
    onMounted(async() => {
      await accountService.getProfileChallenges(route.params.id)
      await accountService.getProfile(route.params.id)
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
