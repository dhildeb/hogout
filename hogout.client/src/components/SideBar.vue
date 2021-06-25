<template>
  <div class="d-flex flex-column align-items-center text-light bg-dark h-100">
    <img class="rounded-circle profile-icon" :src="state.account.picture" alt="">
    <span>{{ state.account.name }}</span>
    <span>{{ state.attempts }}</span>
    <span>{{ state.attempts }}</span>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      attempts: computed(() => AppState.profileAttempts)
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
