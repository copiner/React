/*
异步 生命周期
----init:
p-render
c-render
c-useEffect
p-useEffect

-----parent state change || child props change:

p-render
c-render
c-useEffect-return
c-useEffect
p-useEffect-return
p-useEffect

---------child state change:
c-render
c-useEffect-return
c-useEffect

---------parent unmount:

p-useEffect-return
c-useEffect-return



-----parent state change async || child props change:
p-render
c-render
c-useEffect-return
c-useEffect
p-useEffect-return
p-useEffect
*/
import React from 'react';

import { useState, useEffect, useLayoutEffect } from 'react';

const Lasyncitem = (props) => {

  const [name, setName] = useState("child");

  useEffect(() => {
    //console.log("c-you name is", name);
  }, [name]);

  useEffect(() => {
    console.log("c-useEffect");
    return ()=>{
      console.log("c-useEffect-return");
    }
  });

  return (
    <>
      {
        console.log("c-render")
      }
      <h3>---hookcitem---</h3>
      <p>
        <input placeholder="input your name" onChange={e => setName(e.target.value)} />
        <br />
        your name is {name}, parent name is {props.name}
      </p>
    </>
  );
};

export default Lasyncitem;
