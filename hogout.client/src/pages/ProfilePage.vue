<template>
  <div class="container-fluid">
    <mobileProfile />
  </div>
</template>

<script>
import mobileProfile from '../components/mobileProfile.vue'
export default {
  components: { mobileProfile },
  name: 'Profile'
}
</script>

<style lang="scss" scoped>
.color{
  background-color: #DBDBDB;
}
</style>
