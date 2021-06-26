<template>
  <div class="d-flex flex-column align-items-center text-light bg-dark side-fit h-100 p-5">
    <router-link :to="{ name: 'Profile', params: {id: state.account.id}}">
      <img class="rounded-circle profile-icon mb-3" :src="state.account.picture" alt="">
    </router-link>
    <h5 class="mb-5">
      {{ state.account.name }}
    </h5>
    <span>
      <img title="Total Wins" class="icon-pig text-light" src="../assets/img/pig-crown.png" alt="Wins: " srcset=""> X {{ state.wins.length }}</span>
    <span>
      <img title="Total Attempts" class="icon-pig text-light" src="../assets/img/pig-normal.png" alt="Attempts: " srcset=""> X {{ state.attempts.length }}</span>
  </div>
  <button class="btn btn-outline-danger logout" @click="logout">
    logout
  </button>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { accountService } from '../services/AccountService'
import Notification from '../utils/Notification'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      attempts: computed(() => AppState.profileAttempts.filter(a => a.creatorId === AppState.account.id)),
      wins: computed(() => AppState.profileAttempts.filter(a => a.completed === true && a.creatorId === AppState.account.id))
    })
    watchEffect(async() => {
      await accountService.getUserAttempts(state.account.id)
    })
    return {
      state,
      async logout() {
        if (await Notification.confirmAction('are you sure you want to logout?')) {
          AuthService.logout({ returnTo: window.location.origin })
        }
      }
    }
  }
}
</script>

<style scoped>
.pofile-icon {
  max-height: 100px;
  max-width: 100px;
}
.side-fit{
  position: fixed;
  top: 44px;
}
.logout{
position: fixed;
  left: 64px;
  top: 560px;
}
.icon-pig{
  width: 3.5rem;
  margin-bottom: 1rem;
  mix-blend-mode: color-burn;
}
</style>
