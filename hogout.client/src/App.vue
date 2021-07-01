<template>
  <Navbar />
  <main class="bg-grey">
    <CreatePost />
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
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
::-webkit-scrollbar {
  width: 2rem;
}
 ::-webkit-scrollbar-track {
   height: 40vh;
   background-color: #36544a;
   opacity: 0;
 }
::-webkit-scrollbar-thumb {
  background-image: url('https://res.cloudinary.com/ddbxzcb7k/image/upload/v1564751401/fill-01_vgkaj7.svg');
}
::-webkit-scrollbar-button{
  height: 16px;
width: 16px;
}
::-webkit-scrollbar-button:vertical:decrement{
  background-color: #36544a;
  background-image: url('./assets/img/b-buntop.png');
  background-size: cover;
}
::-webkit-scrollbar-button:vertical:increment{
  background-color: #36544a;
  background-image: url('./assets/img/b-bunbottom.png');
  background-size: cover;
}

</style>
