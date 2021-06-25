<template>
  <div class="row d-flex h-25 line" :style="{backgroundImage: `url(${state.profile.banner})`}">
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="mdi mdi-pencil"></i>
      </a>
      <ul>
        <li><a class="btn-floating red"></a></li>
        <li><a class="btn-floating yellow darken-1"></a></li>
        <li><a class="btn-floating green"></a></li>
        <li><a class="btn-floating blue"></a></li>
      </ul>
    </div>
    <div class="col-12 position text-center">
      <img :src="state.profile.picture" alt="profile-picture" class="rounded-pill frame">
    </div>
  </div>
  <div class="row mt-4 pt-5">
    <div class="col-12 text-center mt-4 pt-5">
      <h3> {{ state.profile.name }} </h3>
    </div>
    <!-- <div class="col-4 text-right mt-4 pt-5">
      <i class="fas fa-caret-down" @click="state.nameForm = !state.nameForm" name="edit name"></i>
    </div> -->
  </div>
  <div class="row form " v-if="state.nameForm">
    <div class="col-12">
      <form @submit.prevent="editProfile()" id="nameForm" name="nameForm">
        <div class="input-group">
          <label for="name" class="sr-only"> name </label>
          <input type="text" v-model="state.profile.name" class="form-control" :placeholder="state.profile.name">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.nameForm = !state.nameForm">
              Button
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row my-1">
    <div class="col-12 text-center">
      <h6>{{ state.profile.location }} </h6>
    </div>
    <!-- <div class="col-4 text-right">
      <i class="fas fa-caret-down" @click="state.locationForm = !state.locationForm" name="edit location"></i>
    </div> -->
  </div>
  <div class="row form" v-if="state.locationForm">
    <div class="col-12 text-center ">
      <form @submit.prevent="editProfile()">
        <div class="input-group">
          <label for="location" class="sr-only"> location </label>
          <input type="text" v-model="state.profile.location" class="form-control" :placeholder="state.profile.location || 'Location'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.locationForm = !state.locationForm">
              Button
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row my-1 bio">
    <div class="col-12 text-center">
      <h6>{{ state.profile.bio }}</h6>
    </div>
    <!-- <div class="col-4 text-right">
      <i class="fas fa-caret-down" @click="state.bioForm = !state.bioForm" name="edit bio"></i>
    </div> -->
  </div>
  <div class="row my-1 form" v-if="state.bioForm">
    <div class="col-12 text-center ">
      <form @submit.prevent="editProfile()">
        <div class="input-group">
          <label for="bio" class="sr-only"> bio </label>
          <input type="text" v-model="state.profile.bio" class="form-control" :placeholder="state.profile.bio || 'bio'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.bioForm = !state.bioForm">
              Button
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row my-1 from" v-if="state.pictureForm">
    <div class="col-12 text-center ">
      <form class="my-2" @submit.prevent="editProfile()">
        <div class="input-group">
          <label for="picture" class="sr-only"> picture </label>
          <input type="text" v-model="state.profile.picture" class="form-control" :placeholder="state.profile.picture || 'picture'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.pictureForm = !state.pictureForm">
              Button
            </button>
          </div>
        </div>
        <div class="input-group">
          <label for="banner" class="sr-only"> banner </label>
          <input type="text" v-model="state.profile.banner" class="form-control" :placeholder="state.profile.banner || 'banner'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.pictureForm = !state.pictureForm">
              Button
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row my-3 awards">
    <div class="col-6 text-right">
      <h5><i class="fas fa-lg fa-award"></i></h5>
    </div>
    <div class="col-6 text-left">
      <h5><i class="fas fa-lg fa-trophy"></i></h5>
    </div>
  </div>
  <div class="row mt-3 shadow">
    <div class="col-12 text-center m-auto shadow">
      <h4>Your Challenges</h4>
    </div>
  </div>
  <div class="row challenges">
    <ProfileChallengeCards />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
export default {
  // props: { user: { type: Object, required: true } },
  setup() {
    const route = useRoute()
    const state = reactive({
      profile: computed(() => AppState.account),
      nameForm: false,
      bioForm: false,
      locationForm: false,
      pictureForm: false,
      challenges: computed(() => AppState.challenges)
    })
    watchEffect(() => {
      // Note - will make call to back end for the challenges attatched to profile
    })
    return {
      state,
      async editProfile() {
        await accountService.editProfile(state.profile, route.params.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.height{
  height: 22vh;
}
.banner-size{
  object-fit: contain;
}
.position{
  margin-top: 5rem;
}
.frame{
    border: 4px black solid;
}
.line{
  border-bottom: 4px solid black;
}
</style>
