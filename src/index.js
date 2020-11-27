
//import render from './1106/';

//import render from './1108/';

//import render from './1111/';

//import render from './1112/';

// import render from './1113/';
// render(element);




//state
//import render from './life/';

//Hook
import render from './hook/';

render()

if (module.hot) {
  // module.hot 为 true 则开启HMR功能
  module.hot.accept('./life/app.js', () => {
    // 监听index.js变化，发生变化，执行该回调函数
    render();
  });
}
