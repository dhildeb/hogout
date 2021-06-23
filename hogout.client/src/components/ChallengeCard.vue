<template>
  <div class="row">
    <div class="col-10 border rounded shadow d-flex">
      <img :src="challenge.image" alt="">
      <div>
        <b>{{ challenge.name }}</b>
        <em>{{ challenge.state }}</em>
        <div>
          <span>{{ challenge.difficulty }}</span>
          <span>{{ challenge.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'

export default {
  props: {
    challenge: { type: Object, required: true }
  },
  setup() {
    const state = reactive({

    })
    return {
      state
    }
  }

}
</script>

<style>

</style>
