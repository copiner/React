import React from 'react';
import ReactDom from 'react-dom';

import App from "./app";
import Hookc from "./hookc";
import Lasync from "./lasync";

let render = () =>{
  ReactDom.render(
      <>
        <Lasync />
      </>,
      document.getElementById('root')
  );
}

export default render;
