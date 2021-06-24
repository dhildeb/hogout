<template>
  <div class="container">
    <div class="row">
      <h1>nav</h1>
    </div>
    <div class="row justify-content-between">
      <div class="col-6 text-center">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            State
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item">Idaho</a>
          </div>
        </div>
      </div>
      <div class="col-6 text-center">
        <button class="btn btn-primary">
          difficulty
        </button>
      </div>
    </div>
    <ChallengeCard v-for="challenge in state.challenges" :key="challenge.id" :challenge="challenge" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { challengesService } from '../services/ChallengesService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      challenges: computed(() => AppState.challenges)
    })
    watchEffect(() => {
      challengesService.getAllChallenges()
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">

</style>
