<template>
  <div class="container h-100">
    <div class="col-1"></div>
    <div class="row flex-column text-light bg-blue side-fit h-100 px-5">
      <div class="col-3">
        <router-link :to="{ name: 'Profile', params: {id: state.account.id}}">
          <img class="rounded-circle profile-icon my-3" :src="state.account.picture" alt="">
        </router-link>
      </div>
      <div class="col-1">
        <h5 class="mb-5 ml-3">
          {{ state.account.name }}
        </h5>
      </div>
      <div class="col-1 d-flex align-items-center ml-4">
        <img title="Total Wins" class="icon-pig text-light" src="../assets/img/pig-crown.png" alt="Wins: " srcset="">
        <span class="p-3">X</span>
        <span>{{ state.wins.length }}</span>
      </div>
      <div class="col-1 d-flex align-items-center ml-4">
        <img title="Total Attempts" class="icon-pig text-light" src="../assets/img/pig-normal.png" alt="Attempts: " srcset="">
        <span class="p-3">X</span>
        <span>{{ state.attempts.length }}</span>
      </div>
      <div class="col d-flex align-items-end mb-5">
        <button class="btn btn-danger m-5 logout" @click="logout">
          logout
        </button>
      </div>
    </div>
  </div>
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
      if (state.account.id) {
        await accountService.getUserAttempts(state.account.id)
      }
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
.profile-icon {
  height: 160px;
  width: 160px;
}
.side-fit{
  position: fixed;
  top: 44px;
}
.icon-pig{
  width: 3.5rem;
  margin-bottom: 1rem;
  mix-blend-mode: color-burn;
  max-height: 51px;
}
</style>
