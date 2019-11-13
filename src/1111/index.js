//1111
import view from './view';
import { tick } from './tick';

import './main.css';


let state = { num: 5 };
let timer;

function render(element) {
    // 初始化的VD
    // const vdom = view(state);

    // const dom = createElement(vdom);
    // element.appendChild(dom);

    timer = setInterval(() => {
        state.num += 1;
        tick(element,state,timer);
    }, 1000);

}

export default render;
