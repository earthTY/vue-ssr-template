import {createApp} from "./app";

export default context => {

  return new Promise((resolve, reject) => {
    const {app, store, router} = createApp();

    router.push(context.url);

    router.onReady(()=>{
      let matchedComponents = router.getMatchedComponents();

      console.log(matchedComponents.length)
      if(!matchedComponents.length){
        reject({code: 404})
      }

      Promise.all(matchedComponents.map((Component)=>{
        if(Component.asyncData){
          return Component.asyncData({
            store,
            route:router.currentRoute
          })
        }
      })).then(()=> {
        //将所有的数据调取后返回store
        context.state = store.state;
        resolve(app);
      }).catch(reject)
    }, reject)
  })

}
