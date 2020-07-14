document.getElementById("lazy").onclick = function(){

  //Magic Comments webpackPreFetch:true预加载
  import(/* webpackChunkName:'lazy' */'./js/lazy.js').then(({lazy})=>{
    console.log(lazy(8,5));
  }).catch(()=>{
    console.log("error");
  })

}

if (module.hot) {
  // module.hot 为 true 则开启HMR功能
  module.hot.accept('./js/index.js', () => {
    // 监听index.js变化，发生变化，执行该回调函数
    log();
  });
}
