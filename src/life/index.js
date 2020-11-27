import React from 'react';
import ReactDom from 'react-dom';

import App from "./app";
import Hookc from "./hookc";
let render = () =>{
  ReactDom.render(
      <>
        <App />
        <Hookc />
      </>,
      document.getElementById('root')
  );
}

export default render;
