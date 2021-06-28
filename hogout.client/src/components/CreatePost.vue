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
  <div class="modal fade bg-transparent"
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
        <div class="modal-body d-flex justify-content-center">
          <h4> star star star star star</h4>
        </div>
        <div class="modal-footer d-flex flex-column">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="createAttempt(true)">
            I Won the Challenge!
          </button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="createAttempt(false)">
            I Tried and Failed!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
