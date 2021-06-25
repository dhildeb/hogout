<template>
  <div class="container color">
    <mobileProfile />
  </div>
</template>

<script>
import mobileProfile from '../components/mobileProfile.vue'
// import 'materialize-css/dist/css/materialize.css'

export default {
  components: { mobileProfile },
  name: 'Profile',
  setup() {

  }
}
</script>

<style scoped>
.color{
  background-color: #e8e8e8;
}
</style>
