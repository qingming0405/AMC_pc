import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MyPop from 'components/common/pop/Popbox.js'
import Combobox from 'components/common/combobox/Combobox.js'

Vue.config.productionTip = false

Vue.use(MyPop)
Vue.use(Combobox)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')