<template>
  <div class="container-fluid about">
    <div class="profile-header" v-if="account">
      <div class="row cover-img text-center" :style="{backgroundImage: `url(${account.coverImg})`}">
        <h3 class="text-light">
          {{ account.name }}
        </h3>
        <div><img :src="account.picture" alt="some picture" class="small-boy"></div>
        <p>{{ account.bio }}</p>
      </div>
      <div class="row text-center">
        <form @submit.prevent="updateAccount()">
          Cover Image<input type="text" v-model="account.coverImg">
          Name <input type="text" v-model="account.name">
          Bio <input type="text" v-model="account.bio">
          Picture<input type="text" v-model="account.picture">
          <button class="btn btn-success ms-1">
            Submit
          </button>
        </form>
      </div>
    </div>
    <div v-else>
      <h4 class="text-light">
        ....Loading
      </h4>
    </div>
    <div class="row">
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    const account = computed(() => AppState.account)
    return {
      account,
      async updateAccount() {
        try {
          await accountService.editAccount(account.value)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.cover-img{
  height: 30vh;
  background-position: center center;
}

.small-boy {
  width: 22vh;
  height: 22vh;
  border-radius: 50%;
}
</style>
