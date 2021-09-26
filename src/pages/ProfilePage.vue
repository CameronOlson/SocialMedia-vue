<template>
  <div class="container-fluid">
    <div class="profile-header" v-if="profile">
      <div class="row">
        <div class="col-12">
          <div class="row cover-img text-center" :style="{backgroundImage: `url(${profile.coverImg})`}">
            <span>
              <h1>{{ profile.name }}</h1>
              <img class="small-boy" :src="profile.picture" alt="">
            </span>
          </div>
          <div class="col-12">
            <p>{{ profile.bio }}</p>
            <p>{{ profile.github }}</p>
            <p>{{ profile.about }}</p>
          </div>
          <!-- TODO come put in profile info  -->
        </div>
      </div>
    </div>
    <div v-else>
      <h4 class="text-light">
        ....Loading
      </h4>
    </div>
    <div class="row" v-if="posts.length > 0">
      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
    <div class="row" v-else>
      <h3>No Porsts..... Very sad Much empty</h3>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { postsService } from '../services/PostsService'
import { profilesService } from '../services/ProfilesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    async function getPosts() {
      try {
        await postsService.getPosts({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'error')
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await profilesService.getProfileById(route.params.id)
        // TODO get posts by profile Id
        getPosts()
      }
    })
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-img{
  height: 30vh;
  background-position: center center;
}
.small-boy{
  width: 125px;
  height: 125px;
  border-radius: 50%;
}
.my-card{
  background-color: rgb(47, 54, 47);
  color: aliceblue;
}
</style>
