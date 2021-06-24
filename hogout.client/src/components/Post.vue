<template>
  <div class="row">
    <div class="col-12">
      <img :src="post.creator.picture" :alt="post.creator.name" @click="loadProfile">
    </div>
    <div class="col-12">
      <span>{{ post.body }}</span>
    </div>
    <div class="col-12">
      <img class="pic-size" :src="post.image1" :alt="post.id" v-if="post.image1">
      <img class="pic-size" :src="post.image2" :alt="post.id" v-if="post.image2">
      <img class="pic-size" :src="post.image3" :alt="post.id" v-if="post.image3">
    </div>
  </div>
</template>

<script>
import { router } from '../router'
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    return {
      loadProfile() {
        router.push({ path: `/profile/${props.post.creatorId}` })
      }
    }
  }
}
</script>

<style>
.pic-size{
  max-width: 100vw;

}
</style>
