import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  posts: [],
  post: null,
  profile: null,
  account: {},
  ads: [],
  currentPage: 1

})
