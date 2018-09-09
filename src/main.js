// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import './components/fonts/fonts.css'

Vue.use(resource);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  resource,
  components: { App },
  template: '<App/>'
})
