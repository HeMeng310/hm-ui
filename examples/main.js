import Vue from 'vue'
import App from './App.vue'
import HmUi from '../packages/index.js'
Vue.use(HmUi)

Vue.config.productionTip = false
// Vue.use(HmUi)
new Vue({
  render: h => h(App),
}).$mount('#app')
