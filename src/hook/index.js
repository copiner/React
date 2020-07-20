import React from 'react';
import ReactDom from 'react-dom';

import Hook from './hook';

import App from './hook/context';
import Counter from './hook/reducer';
import Try from './hook/try';

import Chat from './hook/effect';

import Tool from './context/tool';
import Cxt, { Ext } from './context/context';

import Dyn from './dynamic/app';

import Nst from './nest/app';
import MouseTracker from './props/';
import Mouse from './props/mouse';
import Cat from './props/cat';

import TextButton from './hook/ref';
import CallBack from './hook/callback';
import Memo from './hook/memo';

let render = () =>{
  ReactDom.render(
      <div>
        <Hook/>
        <App/>
        <Counter/>
        <Try/>

        <Chat/>
        <Tool/>
        <Cxt/>
        <Ext/>
        <Dyn/>
        <Nst/>

        <Cat/>

        <TextButton/>
        <CallBack/>
        <Memo/>

      </div>,
      document.getElementById('root')
  );
}

export default render;
