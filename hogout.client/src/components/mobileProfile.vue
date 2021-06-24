<template>
  <div class="container bg-primary">
    <div class="row">
      <div class="col-12 px-1 " :style="{'background-image': state.profile.banner}">
        banner profile
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6 rounded-pill" :style="{'background-image': state.profile.picture }">
        profile image
      </div>
      <div class="col-10">
        <p>{{ state.profile.name }}</p>
        <p>{{ state.profile.location }}</p>
        <p>{{ state.profile.bio }}</p>
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
    <div class="row">
      <!-- <ChallengeCard v-for="challenge in challenges" /> -->
      challeges will go here
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
export default {
  // props: { user: { type: Object, required: true } },
  setup() {
    const route = useRoute()
    const state = reactive({
      profile: route.params.id
    })
    watchEffect(() => {
      // Note - will make call to back end for the challenges attatched to profile
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
