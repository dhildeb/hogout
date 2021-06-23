<template>
  <div class="container">
    <div class="row">
      <h1>nav</h1>
    </div>
    <div class="row justify-content-between">
      <div class="col-6 text-center">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            State
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item">Idaho</a>
          </div>
        </div>
      </div>
      <div class="col-6 text-center">
        <button class="btn btn-primary">
          difficulty
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Home',
  setup() {
    const state = reactive({

    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">

</style>
