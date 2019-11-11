/*1106
import view from './1106/view';
import { tick } from './1106/tick';
import { createElement } from './1106/create';

import './1106/main.css';
*/

/*1108
import view from './1108/view';
import { tick } from './1108/tick';
import { createElement } from './1108/create';

import './1108/main.css';


import view from './1111/view';
import { tick } from './1111/tick';

import './1111/main.css';
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

const element = document.createElement('div');
element.setAttribute("id","app");
document.body.appendChild(element);

render(element);
*/

//state
/*state
import ReactDOM from "react-dom";
import React from "react";

import App from "./state";
const element = document.createElement('div');
element.setAttribute("id","root");
document.body.appendChild(element);

ReactDOM.render(<App />, element);
*/
//life

import ReactDOM from "react-dom";
import React from "react";

import App from "./life";
const element = document.createElement('div');
element.setAttribute("id","root");
document.body.appendChild(element);

ReactDOM.render(<App />, element);
