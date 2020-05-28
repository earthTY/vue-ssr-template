import Vue from 'vue';
import App from './App.vue'
import {createRouter} from "./router";
import {createStore} from "./store";

export function createApp() {
  var router = createRouter();

  var store = createStore();

  var app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
