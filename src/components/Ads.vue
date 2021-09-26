<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-10">
      <img :src="ad.banner" alt="">
    </div>
    <div class="col-1"></div>
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

</style>
