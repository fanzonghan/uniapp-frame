import Vue from 'vue'
import App from './App'
import store from './store'
import fui from './common/fui-app'

Vue.config.productionTip = false
Vue.prototype.fui = fui
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()