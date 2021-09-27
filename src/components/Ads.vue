<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card my-card my-2 p-4">
          <div class="card-body">
            <img :src="ad.square" alt="" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop'
import { adsService } from '../services/AdsService'
export default {
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      async getAds() {
        try {
          await adsService.getAds()
        } catch (error) {
          Pop.toast('error', error)
        }
      }
    }
  }
}
</script>

<style>
.my-card{
  background-color: rgb(3, 39, 21);
  color: aliceblue;
}

</style>
