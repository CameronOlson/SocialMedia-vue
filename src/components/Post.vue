<template>
  <div class="col-4">
    <div class="card">
      <div class="card-body">
        <img :src="post.imgUrl" class="img-fluid rounded shadow">
      </div>
      <p>{{ post.body }}</p>

      <router-link :to="{name: 'Profile', params: {id: post.creatorId}}" class="selectable">
        <span><div>{{ post.creator.name }}
          <img :src="post.creator.picture" alt="picture should go here" class="img-fluid rounded shadow small-boy"></div>
        </span>
      </router-link>
      <!-- TODO here is the likes thing -->
      <span><i class="mdi mdi-heart-outline"></i><h6>{{ post.likes.length }}</h6></span>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deletePost() {
        try {
          await postsService.deletePost(props.post.id)
          Pop.toast('this has been deleted')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>
.small-boy{
  width: 60px
}

</style>
