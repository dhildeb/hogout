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
  height: 50vh;
  width: 20px;;
}
 ::-webkit-scrollbar-track {
   height: 40vh;
   background-color: transparent;
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
  background-image: url('./assets/img/b-buntop.png');
  background-size: cover;
}
::-webkit-scrollbar-button:vertical:increment{
  background-image: url('./assets/img/b-bunbottom.png');
  background-size: cover;
}

</style>
