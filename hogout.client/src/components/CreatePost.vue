<template>
  <!-- Modal Posting Review -->
  <div class="modal fade bg-transparent min-100"
       id="review"
       tabindex="-1"
       role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content leftpadding">
        <div class="modal-header d-flex justify-content-center">
          <h5 class="modal-title ">
            Review This Challenge!
          </h5>
        </div>
        <form @submit.prevent="postComment">
          <div>
            <div class="my-3 forks">
              <RatingComponent :current-rating="state.newRating.rating" @rated="saveRating" />
            </div>
          </div>
          <div class="dropdown py-2">
            <div class="btn btn-outline-primary dropdown-toggle"
                 id="dropdownMenuButton"
                 data-toggle="dropdown"
                 aria-haspopup="true"
                 aria-expanded="false"
            >
              {{ state.newDifficulty.selectedDifficulty }}
            </div>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" @click="setDifficulty('Guinea Pig',1)">Guinea Pig</a>
              <a class="dropdown-item" @click="setDifficulty('Piglet',2)">Piglet</a>
              <a class="dropdown-item" @click="setDifficulty('Pig',3)">Pig</a>
              <a class="dropdown-item" @click="setDifficulty('Hog',4)">Hog</a>
              <a class="dropdown-item" @click="setDifficulty('Wild Boar',5)">Wild Boar</a>
            </div>
          </div>

          <label for="Rating">Rating / Difficulty</label>

          <div>
            <textarea v-model="state.newPost.body"
                      required
                      class="materialize-textarea"
                      name=""
                      id=""
                      rows="10"
            ></textarea>
            <label for="Image">Comment</label>
          </div>

          <div>
            <div>
              <input v-model="state.newPost.images[0]" type="text" title="Image Url">
              <label for="Image1">Optional Image Url</label>
            </div>
            <div>
              <input v-model="state.newPost.images[1]" type="text" title="Image Url">
              <label for="Image2">Optional Image Url</label>
            </div>
            <div>
              <input v-model="state.newPost.images[2]" type="text" title="Image Url">
              <label for="Image3">Optional Image Url</label>
            </div>
          </div>

          <div class="modal-footer bg-transparent">
            <button class="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { useRoute } from 'vue-router'
import $ from 'jquery'
import Notification from '../utils/Notification'
import { ratingsService } from '../services/RatingsService'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      set: false,
      newDifficulty: {
        selectedDifficulty: 'Difficulty',
        rating: 3
      },
      newRating: {
        rating: 1
      },
      newPost: {
        body: '',
        images: []
      }

    })

    return {
      state,
      async postComment() {
        try {
          $('#review').modal('hide')
          await postsService.createPost(route.params.id, state.newPost)
          await ratingsService.handleReviewRating(route.params.id, state.newRating)
          await ratingsService.handleDifficultyRating(route.params.id, state.newDifficulty)
          state.newPost.body = ''
          state.newPost.images = []
          state.newRating.rating = 1
          state.newDifficulty = {
            selectedDifficulty: 'Difficulty',
            rating: 3
          }
          state.newRating.rating = 1
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },

      saveRating(fork) {
        try {
          state.newRating.rating = fork
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      setDifficulty(name, rating) {
        state.newDifficulty.selectedDifficulty = name
        state.newDifficulty.rating = rating
      }
    }
  }
}

</script>

<style scoped>

@media screen and (max-width: 1049px) {
.leftpadding{
    left:0px;
  }
}
@media screen and (min-width: 1050px) {
.leftpadding{
     left:135px;
  }
}

.min-100{
  min-height: 100vh;
}

.forks{
  overflow: auto;
}
</style>
