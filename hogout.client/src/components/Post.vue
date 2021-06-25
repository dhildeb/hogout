<template>
  <div class="row">
    <div class="col card pt-4 rel2">
      <div v-if="post.image2 || post.image3" class="row justify-content-between ab2 rightarr">
        <div class="col d-flex justify-content-end">
          <button @click="changePic('prev')" class="btn btn-primary">
            <i class="mdi mdi-arrow-right-thick"></i>
          </button>
        </div>
      </div>
      <div v-if="post.image2 || post.image3" class="row justify-content-between ab2 leftarr">
        <div class="col">
          <button @click="changePic('next')" class="btn btn-primary">
            <i class="mdi mdi-arrow-left-thick"></i>
          </button>
        </div>
      </div>
      <div class="row ">
        <div class="col-12 d-flex justify-content-center">
          <img class="pic-size" :src="post.image1" :alt="post.id" v-if="state.currentPic === 1 && post.image1">
          <img class="pic-size" :src="post.image2" :alt="post.id" v-if="state.currentPic === 2 && post.image2">
          <img class="pic-size" :src="post.image3" :alt="post.id" v-if="state.currentPic === 3 && post.image3">
        </div>
      </div>
      <div class="row">
        <div class="col-3 py-3">
          <img class="rounded-circle prof-pic m-2" :src="post.creator.picture" :alt="post.creator.name" @click="loadProfile">
        </div>
        <div class="col-7 d-flex align-items-center">
          <span>{{ post.body }}</span>
        </div>
        <div class="col-2">
          <img class=" rounded-circle prof-pic " src="https://placebear.com/300/300" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { router } from '../router'
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      currentPic: 1
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
      }
    }
  }
}
</script>

<style scoped>
.leftarr{
left: 30px;
top: 100px;
}
.rightarr{
right: 30px;
top: 100px;
}
.ab2{
  position: absolute;
  z-index: 1;
}
.medal{
  top: 13px;
  right: 12px;
}
.rel2{
position: relative;
}
.pic-size{
  width: 90vw;
  height: 18rem;
  object-fit: cover;
}
.prof-pic{
  width: inherit;
}

</style>
