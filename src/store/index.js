import { createStore } from 'vuex'

import mutations from './mutations'
import actions from './actions'

const state = {
  // token: '',
  // curUser: null,
  
}

const store = createStore({
  state,
  mutations,
  actions,
})

export default store
