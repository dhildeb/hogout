<template>
  <div class="row bg-yellow pt-3">
    <div class="col-12">
      <div v-if="state.images.length > 1" class="row justify-content-between ab rightarr">
        <div class="col d-flex justify-content-end">
          <div @click="changePic('next')" title="Next" class="bg-transparent pointer">
            <i class="mdi mdi-24px mdi-arrow-right-bold "></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div v-if="state.images.length > 1" class="row justify-content-between ab leftarr">
        <div class="col">
          <div @click="changePic('prev')" title="Previous" class="bg-transparent pointer">
            <i class="mdi mdi-24px mdi-arrow-left-bold "></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="row ">
        <div v-if="state.images.length > 0" class="col-12 card-img-top d-flex justify-content-center mb-3">
          <img class="pic-size" :src="currentPicture()">
        </div>
      </div>
    </div>
    <div class="col-12 mt-3">
      <div class=" ab like-pos">
        <i class="mdi mdi-thumb-up-outline like-icon mdi-18px
          "
           title="like post"
           v-if="state.user.isAuthenticated && state.likes.filter(l => l.creatorId === state.account.id).length <= 0"
           @click="likePost"
        ></i>
        <i class="mdi mdi-undo like-icon mdi-18px" title="Dislike Post" v-if="state.user.isAuthenticated && state.likes.filter(l => l.creatorId === state.account.id).length > 0" @click="likePost"></i>
        <i class="mdi mdi-thumb-up-outline like-icon mdi-18px" v-if="!state.user.isAuthenticated"></i>
        <i class="mdi mdi-close"></i>
        <span>{{ state.likes.length }}</span>
      </div>
      <div class="ab trash-pos">
        <i class="mdi mdi-delete-outline delete-icon text-danger" title="Delete Post" v-if="post.creatorId === state.account.id" @click="deletePost"></i>
      </div>
      <div class="row mr-1 justify-content-between">
        <div class="d-flex align-items-center col">
          <div class="rel">
            <img class="rounded-circle prof-pic m-2 pointer" :title="post.creator.name + '\'s Profile'" :src="post.creator.picture" :alt="post.creator.name" @click="loadProfile">
            <div class="ab medal border border-dark rounded-circle" v-if=" state.userMedals.length">
              <img
                v-if=" state.userMedals.filter(u => u.completed).length === 0"
                title="Attempted this challenge"
                class="icon-pig"
                src="../assets/img/pig-normal2.png"
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
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { router } from '../router'
import { computed } from '@vue/runtime-core'
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
        try {
          router.push({ path: `/profile/${props.post.creatorId}` })
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      changePic(direction) {
        if (direction === 'prev') {
          state.currentPicIndex--
        }
        if (direction === 'next') {
          state.currentPicIndex++
        }
        if (state.currentPicIndex > props.post.images.length - 1) {
          state.currentPicIndex = 0
        }
        if (state.currentPicIndex < 0) {
          state.currentPicIndex = props.post.images.length - 1
        }
        if (!state.images[state.currentPicIndex]) {
          this.changePic(direction)
        }
      },
      currentPicture() {
        const selectedPicture = state.images[state.currentPicIndex]

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

.trash-pos{
top: -41px;
left: 10px;
}
.rel{
position: relative;
}

.leftarr{
  transition: all 0.5s;
 color: rgb(175, 223, 223);
left: 20px;
top: 100px;
text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}
.rightarr{
  transition: all 0.5s;
color: rgb(175, 223, 223);
right:20px;
top: 100px;
text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}
.rightarr:hover{
  color: white;
}
.leftarr:hover{
  color: white;
}
.medal{
top: -3px;
left: 3px;
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
width: 4rem;
height: 4rem;
object-fit: cover;

}
.ofwrap{
  overflow-wrap: anywhere;
}
.pointer{
  cursor: pointer;
}
.delete-icon{
  cursor: pointer;
  font-size: 1.4rem;
}

.like-pos{
top: -41px;
right: 10px;
}
.like-icon{
  cursor: pointer;

}

</style>
