import React from 'react';
import ReactDom from 'react-dom';

import Parent from "./parent";
import Parents from "./another";
import Ph from "./ph";

let render = () =>{
  ReactDom.render(
      <div>

      <Parent />
      <Parents />
      <Ph />
      </div>,
      document.getElementById('root')
  );
}

export default render;
