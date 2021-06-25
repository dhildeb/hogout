<template>
  <div class="fixed-action-btn">
    <a class="btn-floating btn-large red">
      <i class="mdi mdi-pencil"></i>
    </a>
    <ul>
      <li>
        <p class="btn-floating red" @click="state.nameForm = !state.nameForm" name="edit name">
          Name
        </p>
      </li>
      <li>
        <p class="btn-floating yellow darken-1" @click="state.locationForm = !state.locationForm">
          loc
        </p>
      </li>
      <li>
        <p class="btn-floating green" @click="state.bioForm = !state.bioForm">
          bio
        </p>
      </li>
      <li>
        <p class="btn-floating blue" @click="state.pictureForm = !state.pictureForm">
          pics
        </p>
      </li>
    </ul>
  </div>
  <div class="row d-flex h-25 line" :style="{backgroundImage: `url(${state.profile.banner})`}">
    <div class="col-12 position text-center">
      <img :src="state.profile.picture" alt="profile-picture" class="rounded-pill frame">
    </div>
  </div>
  <div class="row mt-4 pt-5">
    <div class="col-12 text-center mt-4 pt-5">
      <h3> {{ state.profile.name }} </h3>
    </div>
  </div>
  <div class="row form " v-if="state.nameForm">
    <div class="col-12">
      <form @submit.prevent="editProfile()" id="nameForm" name="nameForm">
        <div class="input-group">
          <label for="name" class="sr-only"> name </label>
          <input type="text" v-model="state.profile.name" class="form-control w-50" :placeholder="state.profile.name">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.nameForm = !state.nameForm">
              Save
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
  </div>
  <div class="row form" v-if="state.locationForm">
    <div class="col-12 text-center ">
      <form @submit.prevent="editProfile()">
        <div class="input-group">
          <label for="location" class="sr-only"> location </label>
          <input type="text" v-model="state.profile.location" class="form-control w-50" :placeholder="state.profile.location || 'Location'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.locationForm = !state.locationForm">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row my-1 bio end">
    <div class="col-12 text-center">
      <h6>{{ state.profile.bio }}</h6>
    </div>
  </div>
  <div class="row my-1 form" v-if="state.bioForm">
    <div class="col-12 text-center ">
      <form @submit.prevent="editProfile()">
        <div class="input-group">
          <label for="bio" class="sr-only"> bio </label>
          <input type="text" v-model="state.profile.bio" class="form-control w-50" :placeholder="state.profile.bio || 'bio'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.bioForm = !state.bioForm">
              Save
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
          <input type="text" v-model="state.profile.picture" class="form-control w-50" :placeholder="state.profile.picture || 'picture'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2" @click="state.pictureForm = !state.pictureForm">
              Save
            </button>
          </div>
        </div>
        <div class="input-group">
          <label for="banner" class="sr-only"> banner </label>
          <input type="text" v-model="state.profile.banner" class="form-control w-50" :placeholder="state.profile.banner || 'banner'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row my-3 awards end">
    <div class="col-6 text-right">
      <h5><i class="fas fa-lg fa-award blue-ribbon shadow"></i></h5>
      <p class="text-right">
        {{ state.attempts.length }}
      </p>
    </div>
    <div class="col-6 text-left">
      <h5><i class="fas fa-lg fa-trophy gold shadow"></i></h5>
      <p class="text-left">
        {{ state.wins.length }}
      </p>
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
import { computed, watchEffect, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
import M from 'materialize-css'
import { logger } from '../utils/Logger'

export default {
  // props: { user: { type: Object, required: true } },
  setup() {
    const route = useRoute()
    const state = reactive({
      attempts: computed(() => AppState.profileAttempts.filter(a => a.creatorId === route.params.id)),
      wins: computed(() => AppState.profileAttempts.filter(a => a.completed === true && a.creatorId === route.params.id)),
      profile: computed(() => AppState.account),
      nameForm: false,
      bioForm: false,
      locationForm: false,
      pictureForm: false,
      profileChallenges: []
    })
    onMounted(() => {
      M.AutoInit()
    })
    return {
      state,
      attempts: computed(() => AppState.activeChallenge.filter(a => a.creatorId === route.params.id)),
      findChallenges() {
        const attempts = AppState.attempts.filter(a => a.creatorId === route.params.id)
        logger.log(attempts)
      },
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
.end{
    border-bottom: px solid rgb(109, 106, 106);
}
.gold{
  color: #ffd54f;
}
.blue-ribbon{
  color: #4c4cde;
}
</style>
