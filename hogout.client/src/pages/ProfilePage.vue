<template>
  <div class="container-fluid color">
    <MobileProfile />
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
// import MobileProfile from '../components/MobileProfile.vue'
// import 'materialize-css/dist/css/materialize.css'

export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await accountService.getProfileChallenges(route.params.id)
    })
  }
}
</script>

<style scoped>
.color{
  background-color: #e8e8e8;
}
</style>
