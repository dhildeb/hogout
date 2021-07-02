<template>
  <div class="fixed-action-btn click-to-toggle" @click="state.open=!state.open" v-show="profile.id === state.account.id">
    <a class="btn-floating btn-large bun burger">
      <i class="mdi mdi-pencil otext" title="Toggle Edit Profile" :class="state.open ? 'buntop' : 'fullburger'"></i>
    </a>
    <ul>
      <li class="burger">
        <p class="btn-floating bunbottom otext " title="Edit Pictures" @click="state.pictureForm = !state.pictureForm">
          Pics
        </p>
      </li>
      <li class="burger">
        <p class="btn-floating meat otext " title="Edit Location" @click="state.locationForm = !state.locationForm">
          Loc
        </p>
      </li>
      <li class="burger">
        <p class="btn-floating cheese otext " title="Edit Bio" @click="state.bioForm = !state.bioForm">
          Bio
        </p>
      </li>
      <li class="burger">
        <p class="btn-floating lettuce otext " title="Edit Name" @click="state.nameForm = !state.nameForm" name="edit name">
          Name
        </p>
      </li>
    </ul>
  </div>
  <div class="row bg-img" :style="{backgroundImage: `url(${state.profile.banner})`}">
  </div>
  <div class="row d-flex justify-content-center">
    <img :src="state.profile.picture" alt="profile-picture" class="rounded-circle profile-icon frame position d-flex justify-content-center">
  </div>
  <div class="row form justify-content-center">
  </div>
  <div class="row my-3 awards d-flex">
    <div class="col-sm-10 col-md-10 m-auto card bg-yellow shadow border">
      <div class="card-header text-center py-3 bg-yellow">
        <h3 v-if="state.profile.location === '' || !state.profile.location">
          {{ state.profile.name }}
        </h3>
        <h3 v-else>
          {{ state.profile.name }}, {{ state.profile.location }}
        </h3>
        <div class="col-md-8 m-auto py-2" v-if="state.nameForm">
          <form @submit.prevent="editProfile()" id="nameForm" name="nameForm">
            <div class="input-group">
              <label for="name" class="sr-only"> name </label>
              <input type="text" v-model="state.profile.name" class="form-control w-50" :placeholder="state.profile.name" maxlength="40">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary ml-4" type="submit" id="button-addon2">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-8 m-auto py-2 text-center" v-if="state.locationForm">
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
      <div class=" d-flex card-body bg-yellow d-flex justify-content-around">
        <div>
          <div class="pig-frame pig rounded-circle text-center">
            <img class="icon-pig" title="Total Wins" src="../assets/img/pig-crown-sheet-colored.png" alt="pig-crown">
          </div>
          <p class="center">
            X {{ state.wins.length }}
          </p>
        </div>
        <div>
          <div class="pig-no-crown pig-frame rounded-circle text-center">
            <img class="icon-pig center-pig text-right" title="Total Attempts" src="../assets/img/pig-normal-colored.png" alt="normal-pig">
          </div>
          <p class="center">
            X {{ state.attempts.length }}
          </p>
        </div>
      </div>
      <div class=" p-4 rounded bg-yellow card-footer text-center">
        <h5 class="pb-3">
          About Me
        </h5>
        <p>{{ state.profile.bio }}</p>
        <div class="col-md-8 m-auto py-2 text-center" v-if="state.bioForm">
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
        <div class="col-md-8 text-center py-2 m-auto" v-if="state.pictureForm">
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
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-12 text-center">
      <h4 class="border-lg-bottom pb-4">
        Your Challenges
      </h4>
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
import { ratingsService } from '../services/RatingsService'
import M from 'materialize-css'
import Notification from '../utils/Notification'

export default {
  name: 'MobileProfile',
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
      pictureForm: false,
      open: false
    })
    onMounted(async() => {
      materializedInit()
      try {
        await ratingsService.getDifficultyRatings()
        await ratingsService.getReviewRatings()
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    function materializedInit() {
      try {
        const elems = document.querySelectorAll('.fixed-action-btn')
        const instances = M.FloatingActionButton.init(elems, {
          direction: 'bottom',
          hoverEnabled: false
        })
      } catch (error) {
        Notification.toast(error, 'error')
      }
    }
    return {
      state,
      async editProfile() {
        try {
          await accountService.editProfile(state.profile)
          state.nameForm = false
          state.bioForm = false
          state.locationForm = false
          state.pictureForm = false
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.awards{
  padding-top: 10rem;
}
.bg-img{
  background-repeat: no-repeat;
  background-size: cover;
  height: 36vh;
}
.border-lg-bottom{
  border-bottom: 3px solid var(--dark-blue);
}
.btn-floating{
background-color: transparent;
box-shadow: none;
border-radius: 0;
margin: 0;
width: 80px;
height: 80px;
left: 0px;
transition: all .3s;
}
.bunbottom{
  padding-top: .8rem;
  background-image: url('../assets/img/b-bunbottom.png');
   background-size: contain;
   background-repeat: no-repeat;
}
.buntop{
  width: 6rem;
  height:5rem;
  background-image: url('../assets/img/b-buntop.png');
   background-size: contain;
   background-repeat: no-repeat;
}
.burger{
  transition: all .2s ease-in-out;
}
.burger:hover {
  transform: scale(1.1);
}
.card-bg{
  background-color: #faf5f0;
}
.center-pig{
  margin-top: -.50rem;
}
.cheese{
  padding-top: .8rem;
  background-image: url('../assets/img/b-cheese.png');
   background-size: contain;
   background-repeat: no-repeat;
}
//Materialize buttons
.fixed-action-btn{
background-color: transparent;
box-shadow: none;
margin: 0;
top:5rem;
left:1rem;
right: 90rem;
bottom: 56rem;

  ul{
  top:4.5rem;
  left:0px;

  }
}
.frame{
    border: 4px #f2f2f2 solid;
}
.fullburger{
   width: 80px;
  height:80px;
    background-image: url('../assets/img/b-full.png');
   background-size: contain;
   background-repeat: no-repeat;
}
.icon-pig{
  width: 3.5rem;
  margin-bottom: 1rem;
}
.lettuce{
  padding-top: .8rem;
  background-image: url('../assets/img/b-lettuce.png');
   background-size: contain;
   background-repeat: no-repeat;
}
li{
  margin: 0;
  margin-bottom: 0;
  align-self: flex-start;
}
.meat{
  padding-top: .8rem;
  background-image: url('../assets/img/b-meat.png');
   background-size: contain;
   background-repeat: no-repeat;
}
.otext{
  font-size: 1.5rem;

text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;}
.pig{
  height: 3.95rem;
  width: 3.85rem;
}
.pig-frame{
  background: #303e48;
  border: 2px solid #c794c9;
}
.pig-no-crown{
  height: 3.75rem;
  width: 3.95rem;
}
.position{
  position: absolute;
  top: 16rem
}
.profile-icon{
  height: 18rem;
  width: 18rem;
  object-fit: cover;
}
</style>
