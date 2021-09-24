<template>
  <form @submit.prevent="createPost()">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text"
             class="form-control bg-light"
             name="title"
             placeholder="Title...."
             v-model="editable.title"
             required
      >
    </div>
    <div class="form-group">
      <label for="title">Img Url</label>
      <input type="text"
             class="form-control bg-light"
             name="imgUrl"
             placeholder="Img Url...."
             v-model="editable.imgUrl"
             required
      >
    </div>
    <div class="form-group">
      <label for="body">Body</label>
      <input type="text"
             class="form-control bg-light"
             name="body"
             placeholder="this is the body"
             v-model="editable.body"
             required
      >
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Create Project
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createPost() {
        try {
          await postsService.createPost(editable.value)
        } catch (error) {
          Pop.toast(error.message, 'This is the error from the postForm.vue')
        }
      }
    }
  }
}
</script>

<style>

</style>
