<template>
  <div class="row card pt-3">
    <div class="col-12">
      <div v-if="post.image2 || post.image3" class="row justify-content-between ab rightarr">
        <div class="col d-flex justify-content-end">
          <button @click="changePic('prev')" class="btn btn-primary">
            <i class="mdi mdi-arrow-right-thick"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div v-if="post.image2 || post.image3" class="row justify-content-between ab leftarr">
        <div class="col">
          <button @click="changePic('next')" class="btn btn-primary">
            <i class="mdi mdi-arrow-left-thick"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row ">
        <div class="col-12 card-img-top d-flex justify-content-center">
          <img class="pic-size" :src="post.image1" :alt="post.id" v-if="state.currentPic === 1 && post.image1" @error="setPlaceholder">
          <img class="pic-size" :src="post.image2" :alt="post.id" v-if="state.currentPic === 2 && post.image2" @error="setPlaceholder">
          <img class="pic-size" :src="post.image3" :alt="post.id" v-if="state.currentPic === 3 && post.image3" @error="setPlaceholder">
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row mr-1">
        <div class="d-flex align-items-center ">
          <div class="rel">
            <img class="rounded-circle prof-pic m-3" :src="post.creator.picture" :alt="post.creator.name" @click="loadProfile">
            <div class="ab medal border border-dark rounded-circle">
              <img
                v-if=" state.userMedals.length > 0 && state.userMedals.filter(u => u.completed).length === 0"
                title="Attempted this challenge"
                class="icon-pig"
                src="../assets/img/pig-normal.png"
                alt="Pig face"
              >
              <img
                v-if=" state.userMedals.length > 0 && state.userMedals.filter(u => u.completed).length > 0"
                title="Won this challenge"
                class="icon-pig"
                src="../assets/img/pig-crown.png"
                alt="Pig face"
              >
            </div>
          </div>
          <div>
            <h6 class="ofwrap">
              {{ post.creator.name }}
            </h6>
            <p class="ofwrap">
              {{ post.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { router } from '../router'
import { computed, onMounted } from '@vue/runtime-core'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    onMounted(async() =>
      await accountService.getUserAttempts(props.post.creatorId)
    )
    const state = reactive({
      currentPic: 1,
      shownMedal: 0,
      userMedals: computed(() => AppState.profileAttempts.filter(c => c.challengeId === route.params.id))

    })

    return {
      state,
      loadProfile() {
        router.push({ path: `/profile/${props.post.creatorId}` })
      },
      changePic(direction) {
        if (direction === 'prev') {
          state.currentPic--
        }
        if (direction === 'next') {
          state.currentPic++
        }
        if (state.currentPic > 3) {
          state.currentPic = 1
        }
        if (state.currentPic < 1) {
          state.currentPic = 3
        }
      },
      async getUserAttempts() {
        await accountService.getUserAttempts(props.post.creatorId).filter(c => c.id === route.params.id)
      },
      setPlaceholder(event) {
        event.target.src = 'https://www.meatsbylinz.com/Theme/Img/meatmap/mbl-coming-soon-pig.png'
      }

    }
  }
}
</script>

<style scoped>
.icon-pig{
  width: 2rem;

}

.rel{
position: relative;
}

.leftarr{
left: 5px;
top: 100px;
}
.rightarr{
right: 5px;
top: 100px;
}
.medal{
top: 6px;
left: 9px;
background: pink;
}
.ab{
  position: absolute;
  z-index: 1;
}

.pic-size{
  width: inherit;
  height: 18rem;
  object-fit: cover;
}
.prof-pic{

  max-width: 4rem;

}
.ofwrap{
  overflow-wrap: anywhere;
}

</style>
