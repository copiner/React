
/*
* lifecycle

----init:
c-useLayoutEffect
p-useLayoutEffect
c-useEffect
p-useEffect

-----parent state change || child props change:

p-render
c-render
c-useLayoutEffect-return
p-useLayoutEffect-return
c-useLayoutEffect
p-useLayoutEffect
c-useEffect-return
c-useEffect
p-useEffect-return
p-useEffect

---------child state change:
c-render
c-useLayoutEffect-return
c-useLayoutEffect
c-useEffect-return
c-useEffect

---------parent unmount:

p-useEffect-return
p-useLayoutEffect-return
c-useEffect-return
c-useLayoutEffect-return

*/
import React from 'react';

import { useState, useEffect, useLayoutEffect } from 'react';

const Hookcitem = (props) => {

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

  useLayoutEffect(()=>{
    console.log("c-useLayoutEffect");
    return ()=>{
      console.log("c-useLayoutEffect-return");
    }
  })

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

export default Hookcitem;
