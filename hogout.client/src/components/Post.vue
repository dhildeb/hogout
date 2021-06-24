<template>
  <div class="row">
    <div class="card col-12">
      <div class="card-header">
        <img :src="post.creator.picture" :alt="post.creator.name">
      </div>
      <div class="card-body">
        <div class="row">
          <span>{{ post.body }}</span>
        </div>
        <div class="row">
          <img :src="post.image1" :alt="post.id" v-if="post.image1">
          <img :src="post.image2" :alt="post.id" v-if="post.image2">
          <img :src="post.image1" :alt="post.id" v-if="post.image1">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { post: { type: Object, required: true } },
  setup() {

  }
}
</script>

<style>

</style>
