// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex' // importing vuex for statement
import jQuery from 'jquery' //importing jQuery
global.jQuery = jQuery // making jQuery Global
let Bootstrap = require('bootstrap') // requiring bootstrap
import 'bootstrap/dist/css/bootstrap.css' // importing bootstrap css

Vue.config.productionTip = false

//allowing vue to use vuex
Vue.use(Vuex)

//store for state management
const store = new Vuex.Store({
  state: {
    //changeable data goes here(objects are also welcome)
    currentAccount: '',
    currentEmail: '',
    firstName: '',
    lastName: ''
  },
  mutations: {
    changeAccount(state, currentAccount){
      //action to modify item
      state.currentAccount = currentAccount
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
