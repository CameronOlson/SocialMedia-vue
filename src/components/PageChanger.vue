<template>
  <div class="col-12 text-center my-4">
    <button class="btn btn-primary mx-5" @click="getNewerPosts()">
      Newer Posts
    </button>
    <button class="btn btn-primary mx-5" @click="getOlderPosts()">
      Older Posts
    </button>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    return {
      currentPage: computed(() => AppState.currentPage),
      async getOlderPosts() {
        try {
          await postsService.getOlderPosts(AppState.currentPage)
          logger.log(AppState.currentPage)
        } catch (error) {
          Pop.toast('error from the PageChanger', error)
        }
      },
      async getNewerPosts() {
        try {
          await postsService.getNewerPosts(AppState.currentPage)
          logger.log(AppState.currentPage)
        } catch (error) {
          Pop.toast('error from the page changer getNewPosts', error)
        }
      }
    }
  }
}
</script>

<style>

</style>
