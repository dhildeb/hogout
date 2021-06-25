<template>
  <div class="row ">
    <div class="col-12 d-flex justify-content-center">
      <img class="pic-size" :src="post.image1" :alt="post.id" v-if="post.image1">
      <!-- <img class="pic-size" :src="post.image2" :alt="post.id" v-if="post.image2">
      <img class="pic-size" :src="post.image3" :alt="post.id" v-if="post.image3"> -->
    </div>
  </div>
  <div class="row">
    <div class="col-3 py-3">
      <img class="rounded-circle prof-pic" :src="post.creator.picture" :alt="post.creator.name" @click="loadProfile">
    </div>
    <div class="col-9">
      <span>{{ post.body }}</span>
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
      currentPic: 0
    })
    return {
      state,
      loadProfile() {
        router.push({ path: `/profile/${props.post.creatorId}` })
      }
    }
  }
}
</script>

<style>

.ab2{
  position: absolute;
  z-index: 1;
}
.rel2{
position: relative;
}
.pic-size{
  width: 90vw;
  height: 18rem;
  object-fit: cover;
}

</style>
