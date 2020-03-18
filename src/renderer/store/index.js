import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'

import Counter from './modules/Counter'


import musicPlay from './music/musicPlay'//音乐组件


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
      music:musicPlay,
      // counter:Counter
  },

  
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  strict: process.env.NODE_ENV !== 'production'
})
