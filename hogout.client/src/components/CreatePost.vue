<template>
  <!-- Modal Posting Review -->
  <div class="modal fade bg-transparent min-100"
       id="review"
       tabindex="-1"
       role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-center">
          <h5 class="modal-title ">
            Review This Challenge!
          </h5>
        </div>
        <form @submit.prevent="postComment">
          <div>
            <div class="my-3 forks">
              <RatingComponent :current-rating="state.newPost.rating" @rated="saveRating" />
            </div>
          </div>

          <label for="Rating">Rating</label>

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
      newPost: {
        rating: 1,
        body: '',
        images: []
      }

    })

    return {
      state,
      async postComment() {
        try {
          await postsService.createPost(route.params.id, state.newPost)
          await ratingsService.handleReviewRating(route.params.id, state.newPost.rating)
          $('#review').modal('hide')
          $('.modal-backdrop').hide()
          state.newPost = {}
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },

      saveRating(fork) {
        state.newPost.rating = fork
      }
    }
  }
}

</script>

<style>
.min-100{
  min-height: 100vh;
}

.forks{
  overflow: auto;
}
</style>
