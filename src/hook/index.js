import React from 'react';
import ReactDom from 'react-dom';


import SearchResults from "./effect";
import Romate from "./data";
import Generic from "./data/generic";
import State from "./state";
import Box from "./state/box";
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
        <Box/>
        <Counter/>

        <MeasureDom/>
        <State />
       */}

      <Memoized />

      </div>,
      document.getElementById('root')
  );
}

export default render;
