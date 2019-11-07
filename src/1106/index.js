/*
我们做一个定时器，500 毫秒运行一次，每次对 state 加 1。页面的li元素的数量随着 state 而变。
*/
import view from './view';
import tick from './tick';

let state = { num: 5 };
let timer;
let preVDom;

function render(element) {
    // 初始化的VD
    const vdom = view();
    preVDom = vdom;

    const dom = createElement(vdom);
    element.appendChild(dom);

    timer = setInterval(() => {
        state.num += 1;
        tick(element);
    }, 1000);

}
let e = document.querySelector("#root");

render(e);
