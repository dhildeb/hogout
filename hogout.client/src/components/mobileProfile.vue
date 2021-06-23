<template>
  <div class="container bg-primary">
    <div class="row">
      <div class="col-12 px-1">
        banner profile
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        profile image
      </div>
      <div class="col-10">
        <p>name</p>
        <p>location</p>
        <p>bio</p>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p>medals</p>
      </div>
      <div class="col-6">
        <p>medals</p>
      </div>
    </div>
    <div class="row">
      <div class="col-10">
        <h4>Your Challenges</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      profile: AppState.user
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
