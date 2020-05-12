import React from 'react';
import ReactDom from 'react-dom';

import App from "./app";

let render = () =>{
  ReactDom.render(
      <App />,
      document.getElementById('root')
  );
}

export default render;
