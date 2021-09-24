<template>
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <h1>{{ account.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>

</style>
