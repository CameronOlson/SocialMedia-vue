<template>
  <div class="container-fluid">
    <div class="profile-header" v-if="profile">
      <div class="row">
        <div class="col-12">
          <div class="row cover-img text-center" :style="{backgroundImage: `url(${profile.coverImg})`}">
            <span>
              <h1 class="text-outlined">{{ profile.name }}
                <div v-if="profile.graduated == true">
                  <p class="mdi mdi-school">
                  </p>
                </div>
                <div v-if="profile.graduated == false">
                </div>
              </h1>
              <img class="small-boy" :src="profile.picture" alt="">
            </span>
          </div>
          <div class="col-12">
            <p>{{ profile.bio }}</p>
            <a :href="profile.github" class="text-dark"><i class="mdi mdi-github selectable f-20"></i></a>
            <a :href="profile.linkedin" class="text-dark"><i class="mdi mdi-linkedin selectable f-20"></i></a>
            <p>{{ profile.class }}</p>
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
      <h3>You Should Post Some Stuff</h3>
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

.text-outlined{
  color: white;
  font-size: 40px;
  -webkit-text-stroke: 1px black;
}
.strokeme
{
    color: white;
    text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}

</style>
