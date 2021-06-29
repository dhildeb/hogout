<template>
  <Navbar />
  <main class="justify-content-center">
    <router-view />
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'

export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
