import React from 'react';
import ReactDom from 'react-dom';

import Hook from './hook';

import App from './hook/context';
import Counter from './hook/reducer';

import Chat from './hook/effect';

import Tool from './context/tool';
import Cxt, { Ext } from './context/context';

import Dyn from './dynamic/app';

import Nst from './nest/app';
import MouseTracker from './props/';
import Mouse from './props/mouse';
import Cat from './props/cat';

let render = () =>{
  ReactDom.render(
      <div>
        <Hook/>
        <App/>
        <Counter/>
        <Chat/>
        <Tool/>
        <Cxt/>
        <Ext/>
        <Dyn/>
        <Nst/>


        <Cat/>
      </div>,
      document.getElementById('root')
  );
}

export default render;
