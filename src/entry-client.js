import {createApp} from "./app";

const {app, store, router} = createApp();

//替换客户端的store数据
if(window.__INITIAL_STATE__){
  store.replaceState(window.__INITIAL_STATE__)
}

//路由完成后挂载app
router.onReady(()=> {
  app.$mount('#app');
})
