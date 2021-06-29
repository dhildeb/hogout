<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-center">
      <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#review">
        Post A Review
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-12 d-flex justify-content-center">
      <u><h2>Reviews</h2></u>
    </div>
  </div>
  <!-- Modal Posting Review -->
  <div class="modal fade bg-transparent min-100"
       id="review"
       tabindex="-1"
       role="dialog"
       aria-labelledby="reviewTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-center">
          <h5 class="modal-title " id="exampleModalLongTitle">
            Review This Challenge!
          </h5>
        </div>
        <form @submit.prevent="postComment">
          <div>
            <div>
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
            <input v-model="state.newPost.image1" type="text" title="Image Url">
            <label for="Image1">Optional Image Url</label>
          </div>
          <div>
            <input v-model="state.newPost.image2" type="text" title="Image Url">
            <label for="Image2">Optional Image Url</label>
          </div>
          <div>
            <input v-model="state.newPost.image3" type="text" title="Image Url">
            <label for="Image3">Optional Image Url</label>
          </div>

          <div class="modal-footer bg-transparent">
            <button type="submit">
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
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      set: false,
      newPost: {
        rating: 1,
        body: '',
        image1: null,
        image2: null,
        image3: null
      }

    })

    return {
      state,
      async postComment() {
        try {
          await postsService.createPost(route.params.id, state.newPost)
          $('#review').modal('hide')
          state.newPost = {}
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },

      saveRating(ratingNum) {
        state.newPost.rating = ratingNum
      }
    }
  }
}

</script>

<style>
.min-100{
  min-height: 100vh;
}

</style>
