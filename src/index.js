
// import view from './1106/view';
// import { tick } from './1106/tick';
// import { createElement } from './1106/create';
//
// import './1106/main.css';

import view from './1108/view';
import { tick } from './1108/tick';
import { createElement } from './1108/create';

import './1108/main.css';

let state = { num: 5 };
let timer;

function render(element) {
    // 初始化的VD
    // const vdom = view(state);
    //
    // const dom = createElement(vdom);
    // element.appendChild(dom);

    timer = setInterval(() => {
        state.num += 1;
        tick(element,state,timer);
    }, 1000);

}

const element = document.createElement('div');
element.setAttribute("id","app");
document.body.appendChild(element);

render(element);
