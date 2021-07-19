<template>
  <div class="row justify-content-center pb-4">
    <div @click="goThere" class=" zoom  click card bg-yellow challenge ">
      <img class="d-none d-md-block card-img-top banner" :src="state.banner" @error="state.banner='https://source.unsplash.com/8l8Yl2ruUsg/1600x800'" alt="Challenge Banner">
      <div class="rel challengeTop">
        <img class="ab pic-loc icon" :src="state.image" @error="state.image='https://source.unsplash.com/vWyLVrlOdus/800x800'" alt="Challenge Icon">
        <div class="ab p-2 loc-loc d-flex align-items-center">
          <i class="mdi wshd mdi-map-marker text-primary mdi-24px d-flex justify-content-center"></i>
          <h5 class="m-0 ml-1 shd">
            {{ challenge.state }}
          </h5>
        </div>
        <div class="row m-0 my-4">
          <div class="col ">
            <h2 class="mx-3 mb-4 text-center">
              {{ challenge.name }}
            </h2>
            <div class=" m-0 justify-content-between row">
              <h5 class=" col m-0 text-red align-self-center">
                {{ getDifficultyRating(challenge) }}
              </h5>
              <div class=" col d-flex mr-3  justify-content-end" title="Rating">
                <img src="../assets/img/fullFork.png" class="img-fluid icon-fork" alt="">
                <img v-if="getReviewRating(challenge) > 1.5" src="../assets/img/fullFork.png" class=" icon-fork" alt="">
                <img v-else src="../assets/img/emptyFork.png" class=" icon-fork" alt="">
                <img v-if="getReviewRating(challenge) > 2.4" src="../assets/img/fullFork.png" class=" icon-fork" alt="">
                <img v-else src="../assets/img/emptyFork.png" class=" icon-fork" alt="">
                <img v-if="getReviewRating(challenge) > 3.4" src="../assets/img/fullFork.png" class=" icon-fork" alt="">
                <img v-else src="../assets/img/emptyFork.png" class=" icon-fork" alt="">
                <img v-if="getReviewRating(challenge) > 4.5" src="../assets/img/fullFork.png" class=" icon-fork" alt="">
                <img v-else src="../assets/img/emptyFork.png" class="img-fluid icon-fork" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { difficultyRatingAve, reviewRatingAve } from '../utils/RatingAve'
import { useRouter } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  props: {
    challenge: { type: Object, required: true }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      challengeId: props.challenge.id,
      banner: props.challenge.banner,
      image: props.challenge.image
    })
    return {
      state,
      getReviewRating(data) {
        try {
          return reviewRatingAve(data.id)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      getDifficultyRating(data) {
        try {
          return difficultyRatingAve(data.id)
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      goThere() {
        try {
          router.push({ name: 'Challenge', params: { id: state.challengeId } })
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }

}
</script>

<style scoped>

.loc-loc{
  top: -172px;
  left: 9px;
  color: white;

}
.shd{
  text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;

}
.wshd{
  text-shadow: rgb(187, 224, 228) 2px 0px 0px, rgb(187, 224, 228) 1.75517px 0.958851px 0px,
   rgb(187, 224, 228) 1.0806px 1.68294px 0px, rgb(187, 224, 228) 0.141474px 1.99499px 0px,
   rgb(187, 224, 228) -0.832294px 1.81859px 0px, rgb(187, 224, 228) -1.60229px 1.19694px 0px,
   rgb(187, 224, 228) -1.97998px 0.28224px 0px, rgb(187, 224, 228) -1.87291px -0.701566px 0px,
   rgb(187, 224, 228) -1.30729px -1.5136px 0px, rgb(187, 224, 228) -0.421592px -1.95506px 0px,
   rgb(187, 224, 228) 0.567324px -1.91785px 0px, rgb(187, 224, 228) 1.41734px -1.41108px 0px,rgb(187, 224, 228) 1.92034px -0.558831px 0px;

}
.text-red{
  color: #e00000 ;
}
.challenge{
  width: 35vw;
}

.ab{
  position: absolute;
}
.rel{
  position: relative;
}

.pic-loc{
  right: 13px;
  top: -171px;
}

.icon{

height: 135px;
  border-radius: 10%;
  width: fit-content;
  max-width: 130px;
  object-fit: scale-down;
  background-color: #ffffffaf;
}

.banner{
  height: 180px;
  object-fit: cover;
}

.zoom{
  transition: all .25s linear;
}
.zoom:hover{
  transform: scale(1.1);

}
.click{
  cursor: pointer;
}
.icon-fork{
  margin-right: 5px;
  max-height: 38px;
}
@media screen and (max-width: 767px) {
  .challenge{
    width: 80vw;
  }

.loc-loc{
  right: 0px;
  top: -80px;
}
  .icon{
right: 11px;
  top: -116px;
  border-style: dashed;
  border-width: 1.5px;
  border-color: rgba(0, 0, 0, 0.212);
}
.challengeTop{
  margin-top: 85px;
}
}

@media screen and (min-width: 768px) {
  .challenge{
    width: 50vw;
  }
  .challengeTop{
  margin-top: 0px;
}
}
@media screen and (min-width: 1050px) {
  .challenge{
    width: 40vw;
  }
    .challengeTop{
  margin-top: 0px;
}
}
</style>
