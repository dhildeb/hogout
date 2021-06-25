<template>
  <div class="d-flex flex-column align-items-center bg-dark h-100">
    <img class="rounded-circle" :src="state.account.picture" alt="">
    <span>{{ state.account.name }}</span>
    <span>{{ state.account.complete }}</span>
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

<style>
img {
  max-height: 100px;
  max-width: 100px;
}

*{
  outline: 1px solid red;
}
</style>
