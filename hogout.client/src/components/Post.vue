<template>
  <div class="row card pt-3">
    <div class="col-12">
      <div v-if="state.images.length > 1" class="row justify-content-between ab rightarr">
        <div class="col d-flex justify-content-end">
          <button @click="changePic('next')" class="btn btn-primary">
            <i class="mdi mdi-arrow-right-thick"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div v-if="state.images.length > 1" class="row justify-content-between ab leftarr">
        <div class="col">
          <button @click="changePic('prev')" class="btn btn-primary">
            <i class="mdi mdi-arrow-left-thick"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row ">
        <div class="col-12 card-img-top d-flex justify-content-center">
          <img class="pic-size" :src="currentPicture()" v-if="state.images.length > 0">
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row mr-1 justify-content-between">
        <div class="d-flex align-items-center col-8">
          <div class="rel">
            <img class="rounded-circle prof-pic m-3 pointer" :src="post.creator.picture" :alt="post.creator.name" @click="loadProfile">
            <div class="ab medal border border-dark rounded-circle" v-if=" state.userMedals.length">
              <img
                v-if=" state.userMedals.filter(u => u.completed).length === 0"
                title="Attempted this challenge"
                class="icon-pig"
                src="../assets/img/pig-normal.png"
                alt="Pig face"
              >
              <img
                v-if=" state.userMedals.filter(u => u.completed).length > 0"
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
        <div class="col-3 align-items-center">
          <i class="mdi mdi-thumb-up like-icon" title="like post" v-if="state.user.isAuthenticated && state.likes.filter(l => l.creatorId === state.account.id).length <= 0" @click="likePost"></i>
          <i class="mdi mdi-thumb-down like-icon" title="like post" v-if="state.user.isAuthenticated && state.likes.filter(l => l.creatorId === state.account.id).length > 0" @click="likePost"></i>
          <i class="mdi mdi-close"></i>
          <span>{{ state.likes.length }}</span>
        </div>
        <div class="col-1 align-items-center">
          <i class="mdi mdi-trash-can delete-icon" title="delete post" v-if="post.creatorId === state.account.id" @click="deletePost"></i>
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
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
import { likesService } from '../services/LikesService'
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()

    const state = reactive({
      images: props.post.images,
      currentPicIndex: 0,
      shownMedal: 0,
      userMedals: computed(() => AppState.attempts.filter(a => a.creatorId === props.post.creatorId)),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      likes: computed(() => AppState.postLikes.filter(l => l.postId === props.post.id)),
      newLike: { like: 'like' }

    })
    return {
      state,
      loadProfile() {
        router.push({ path: `/profile/${props.post.creatorId}` })
      },
      changePic(direction) {
        if (direction === 'prev') {
          state.currentPicIndex--
        }
        if (direction === 'next') {
          // if (state.images[state.currentPicIndex] === '' || null) {
          //   state.currentPicIndex++
          // }
          state.currentPicIndex++
          // state.currentPicIndex %= props.post.images.length
        }
        if (state.currentPicIndex > props.post.images.length - 1) {
          state.currentPicIndex = 0
        }
        if (state.currentPicIndex < 0) {
          state.currentPicIndex = props.post.images.length - 1
        }
        if (!state.images[state.currentPicIndex]) {
          console.log('[broken link!]')
          this.changePic(direction)
        }
      },
      currentPicture() {
        const selectedPicture = state.images[state.currentPicIndex]
        // console.log('selected picture', selectedPicture)
        return selectedPicture
      },
      async getUserAttempts() {
        try {
          await accountService.getUserAttempts(props.post.creatorId).filter(c => c.id === route.params.id)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      async deletePost() {
        if (await Notification.confirmAction()) {
          await postsService.deletePost(props.post.id)
        }
      },
      async likePost() {
        try {
          await likesService.handlePostLike(props.post.id, state.newLike)
        } catch (error) {
          Notification.toast(error, 'error')
        }
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
.pointer{
  cursor: pointer;
}
.delete-icon{
  cursor: pointer;
  font-size: 2.5rem;
}
.like-icon{
  cursor: pointer;
  font-size: 2.5rem;
}

</style>
