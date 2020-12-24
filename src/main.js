import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import MyPop from 'components/common/pop/Popbox.js'
import Select from 'components/common/select/Select.js'
import MultiSelect from 'components/common/multiselect/MultiSelect.js'
import FilterBox from 'components/common/filter/FilterBox.js'

Vue.config.productionTip = false

Vue.use(MyPop)
Vue.use(Select)
Vue.use(MultiSelect)
Vue.use(FilterBox)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')