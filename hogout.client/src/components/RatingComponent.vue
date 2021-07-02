<template>
  <div class="rating d-flex position-relative" @mouseenter="toggleTemp" @mouseleave="toggleTemp">
    <!-- itterate the number of times we allow max rating (ex 5) -->
    <div @click="rate(fork)" v-for="fork in 5" :key="fork" class="position-relative">
      <!-- first is the img that is a good rating (ex the 3rd fork in a 4 fork rating) -->
      <div @mouseover="setTemp(fork)">
        <div v-show="fork <= (state.temp ? state.tempRating : state.forks)">
          <img class="rating pointer" src="../assets/img/fullFork.png" alt="fork">
        </div>
        <!-- <i v-show="fork <= (state.temp ? state.tempRating : state.forks)" class="fas fa-star large"></i> -->
        <!-- then the image that is not rated (ex the 4th fork in a 3 fork rating) -->
        <div v-show="fork > (state.temp ? state.tempRating : state.forks)">
          <img class="rating pointer" src="../assets/img/emptyFork.png" alt="empty fork">
        </div>
        <!-- <i v-show="fork > (state.temp ? state.tempRating : state.forks)" class="far fa-star large"></i> -->
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, watchEffect } from 'vue'
export default {
  props: {
    currentRating: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      forks: props.currentRating,
      temp: false,
      tempRating: props.currentRating
    })
    watchEffect(() => { state.forks = props.currentRating })
    return {
      state,
      rate(fork) {
        state.forks = fork
        state.tempRating = fork
        emit('rated', fork)
      },
      setTemp(fork) {
        state.tempRating = fork
      },
      toggleTemp() {
        state.temp = !state.temp
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rating{
  width: 1.3rem;
  margin-right: 5px;
  margin-left: 5px;
}
.pointer:hover{
  cursor: pointer;
}
</style>
