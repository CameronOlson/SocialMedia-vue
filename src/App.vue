<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div>
      <PageChanger />
    </div>
    <div>
      <Ads v-for="a in ads" :key="a.id" :ad="a" />
    </div>
  </footer>
  <Modal id="post-form">
    <template #modal-title>
      <h4>Post Form</h4>
    </template>
    <template #modal-body>
      <PostForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { adsService } from './services/AdsService'
import Pop from './utils/Pop'
export default {
  name: 'App',
  setup() {
    onMounted(async() => {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.short{
  height: 10rem;
}
</style>
