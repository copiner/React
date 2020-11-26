import React from 'react';
import ReactDom from 'react-dom';

import Measure from "./callback";

let render = () =>{
  ReactDom.render(
      <Measure />,
      document.getElementById('root')
  );
}

export default render;
