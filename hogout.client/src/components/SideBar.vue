<template>
  <div class=" col  h-100 side-fit  text-light bg-dark-blue ">
    <div class="row  justify-content-center mt-5">
      <router-link :to="{ name: 'Profile', params: {id: state.account.id}}">
        <img class="rounded-circle profile-icon mt-3" :src="state.account.picture" alt="">
      </router-link>
    </div>
    <div class="row justify-content-center">
      <div class="col mx-3">
        <h5 class="text-center">
          {{ state.account.name }}
        </h5>
      </div>
    </div>
    <div class="row justify-content-center align-items-center mb-0">
      <img title="Total Wins" class="icon-pig text-light" src="../assets/img/pig-crown.png" alt="Wins: " srcset="">
      <span class="px-2"><i class="mdi mdi-close"></i></span>
      <h5 class="mb-1">
        {{ state.wins.length }}
      </h5>
    </div>
    <div class="row justify-content-center align-items-center">
      <img title="Total Attempts" class="icon-pig text-light" src="../assets/img/pig-normal.png" alt="Attempts: " srcset="">
      <span class="p-2"><i class="mdi mdi-close"></i></span>
      <h5 class="mb-1">
        {{ state.attempts.length }}
      </h5>
    </div>
    <div class="row spacer"></div>
    <div class="row justify-content-center ">
      <button class="btn btn-danger  logout" @click="logout">
        logout
      </button>
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

.spacer{
  height: 23rem;
}

.profile-icon {
  height: 160px;
  width: 160px;
  border-style: solid;
  border-color: #ebc3ec;
}
.side-fit{
  position: fixed;
  top: 44px;
  z-index: 3;
  left:0;
  width: 280px;
}
.icon-pig{
  width: 3.5rem;
  margin-bottom: 1rem;
  mix-blend-mode: color-burn;
  max-height: 51px;
}
</style>
