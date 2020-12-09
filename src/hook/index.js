import React from 'react';
import ReactDom from 'react-dom';

import Hook from './hook';

import App from './hook/context';
import Try from './hook/try';

import Chat from './hook/effect';

import Tool from './context/tool';
import Cxt, { Ext } from './context/context';

import Dyn from './dynamic/app';

import Nst from './nest/app';
import MouseTracker from './props/';
import Mouse from './props/mouse';
import Cat from './props/cat';

import CallBack from './hook/callback';
import Memo from './hook/memo';

import SearchResults from "./effect";

import Romate from "./data";
import Generic from "./data/generic";

import Measure from "./state";

import Box from "./state/box";

import Counter from './reducer/';

let render = () =>{
  ReactDom.render(
      <div>
      { /*
        <Hook/>
        <App/>
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
        <SearchResults />

        <Romate />
        <Measure />
        <Generic />
        <Box/>
       */}


      <Counter/>



      </div>,
      document.getElementById('root')
  );
}

export default render;
