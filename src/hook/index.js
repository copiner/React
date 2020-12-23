import React from 'react';
import ReactDom from 'react-dom';

import State from "./state";
import Effect from "./effect";
import Romate from "./data";
import Generic from "./data/generic";

import Counter from './reducer/';
import Memoized from './memoized';
import MeasureDom from './nodedom';

let render = () =>{
  ReactDom.render(
      <div>
      { /*

        <TextButton/>
        <Memo/>
        <SearchResults />
        <Romate />
        <Generic />
        <Counter/>

        <MeasureDom/>
        <State />


        <Memoized />

        <Effect />
       */}


      <State />

      </div>,
      document.getElementById('root')
  );
}

export default render;
