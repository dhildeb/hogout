<template>
  <div class="fixed-action-btn" v-show="profile.id === state.account.id">
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
  <div class="row bg-img" :style="{backgroundImage: `url(${state.profile.banner})`}">
    <div class="col-12 position text-center">
      <img :src="state.profile.picture" alt="profile-picture" class="rounded-circle profile-icon frame">
    </div>
  </div>
  <div class="row mt-4 pt-5">
    <div class="col-12 text-center">
      <h3> {{ state.profile.name }} </h3>
    </div>
  </div>
  <div class="row form justify-content-center" v-if="state.nameForm">
    <div class="col-md-8">
      <form @submit.prevent="editProfile()" id="nameForm" name="nameForm">
        <div class="input-group">
          <label for="name" class="sr-only"> name </label>
          <input type="text" v-model="state.profile.name" class="form-control w-50" :placeholder="state.profile.name">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary ml-4" type="submit" id="button-addon2">
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
  <div class="row form justify-content-center" v-if="state.locationForm">
    <div class="col-md-8 text-center ">
      <form @submit.prevent="editProfile()">
        <div class="input-group">
          <label for="location" class="sr-only"> location </label>
          <input type="text" v-model="state.profile.location" class="form-control w-50" :placeholder="state.profile.location || 'Location'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary ml-4" type="submit" id="button-addon2">
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
  <div class="row my-1 form justify-content-center" v-if="state.bioForm">
    <div class="col-md-8 text-center">
      <form @submit.prevent="editProfile()">
        <div class="input-group">
          <label for="bio" class="sr-only"> bio </label>
          <input type="text" v-model="state.profile.bio" class="form-control w-50" :placeholder="state.profile.bio || 'bio'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary ml-4" type="submit" id="button-addon2">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row my-1 from justify-content-center" v-if="state.pictureForm">
    <div class="col-md-8 text-center ">
      <form class="my-2" @submit.prevent="editProfile()">
        <label for="picture">Profile Picture </label>
        <div class="input-group">
          <input type="text" v-model="state.profile.picture" class="form-control w-50" :placeholder="state.profile.picture || 'picture'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary ml-4" type="submit" id="button-addon2">
              Save
            </button>
          </div>
        </div>
        <label for="banner"> Profile Banner </label>
        <div class="input-group">
          <input type="text" v-model="state.profile.banner" class="form-control w-50" :placeholder="state.profile.banner || 'banner'">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary ml-4" type="submit" id="button-addon2">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row my-3 awards end">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <img class="icon-pig" title="Total Wins" src="../assets/img/pig-crown.png" alt="">
      <p class="pt-3 pl-1">
        X {{ state.wins.length }}
      </p>
    </div>
    <div class="col-12 d-flex align-items-center justify-content-center">
      <img class="icon-pig" title="Total Attempts" src="../assets/img/pig-normal.png" alt="">
      <p class="pt-3 pl-1">
        X {{ state.attempts.length }}
      </p>
    </div>
  </div>
  <div class="row mt-3 shadow">
    <div class="col-12 text-center bg-white m-auto shadow">
      <h4>Your Challenges</h4>
    </div>
  </div>
  <div class="challenges" v-if="state.challenges">
    <ProfileChallengeCards v-for="challenge in state.challenges" :key="challenge.id" :challenge="challenge" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { ratingsService } from '../services/RatingsService'
import M from 'materialize-css'

export default {
  props: {
    profile: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      attempts: computed(() => AppState.profileAttempts.filter(a => a.creatorId === route.params.id)),
      wins: computed(() => AppState.profileAttempts.filter(a => a.completed === true && a.creatorId === route.params.id)),
      challenges: computed(() => AppState.profileChallenges),
      account: computed(() => AppState.account),
      profile: computed(() => props.profile),
      nameForm: false,
      bioForm: false,
      locationForm: false,
      pictureForm: false
    })
    onMounted(async() => {
      M.AutoInit()
      await ratingsService.getDifficultyRatings()
      await ratingsService.getReviewRatings()
    })
    return {
      state,
      findChallenges() {
        const attempts = AppState.attempts.filter(a => a.creatorId === route.params.id)
        logger.log(attempts)
      },
      async editProfile() {
        await accountService.editProfile(state.profile)
        state.nameForm = false
        state.bioForm = false
        state.locationForm = false
        state.pictureForm = false
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
  background-repeat: no-repeat;
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
.icon-pig{
  width: 3.5rem;
  margin-bottom: 1rem;
}
.bg-img{
  background-repeat: no-repeat;
  background-size: cover;
}
.profile-icon{
  height: 120px;
  width: 120px;
  object-fit: cover;
}

</style>
