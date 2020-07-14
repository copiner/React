import React from 'react';
import ReactDom from 'react-dom';

import Hook from './hook';
import { FriendStatus, FriendListItem } from './hook/effect';

import App from './hook/context';
import Tool from './context/tool';
import Cxt, { Ext } from './context/context';

import Dyn from './dynamic/app';

import Nst from './nest/app';

let friend = {
  id:1,
  name:'wdaonngg',
  status:{
    isOnline:'Online'
  }
}

let render = () =>{
  ReactDom.render(
      <div>
      <FriendStatus friend={ friend }/>
      <FriendListItem friend={ friend }/>
      <Hook/>
      <App/>
      <Tool/>
      <Cxt/>
      <Ext/>
      <Dyn/>
      <Nst/>
      </div>,
      document.getElementById('root')
  );
}

export default render;
