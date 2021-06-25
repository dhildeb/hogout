<template>
  <div class="d-flex flex-column align-items-center text-light bg-dark h-100">
    <img class="rounded-circle profile-icon" :src="state.account.picture" alt="">
    <span>{{ state.account.name }}</span>
    <span>wins: {{ state.wins }}</span>
    <span>attempts: {{ state.attempts.length }}</span>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { getUserWins } from '../utils/AttemptsUtil'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      attempts: computed(() => AppState.profileAttempts),
      wins: getUserWins()
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
.pofile-icon {
  max-height: 100px;
  max-width: 100px;
}

</style>
