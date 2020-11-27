/**
*
useEffect() 会在父子组件的 componentDidUpdate() / componentDidMount() 都触发之后才被触发。
当父子组件都用到 useEffect() 时，子组件中的会比父组件中的先触发

如果卸载旧组件的同时伴随有新组件的创建，新组件会先被创建并执行完 render，
然后卸载不需要的旧组件，最后新组件执行挂载完成的回调
*/
import React from 'react';
import ReactDOM from "react-dom";
import Hookcitem from "./hookcitem";
import { useState, useEffect, useLayoutEffect } from 'react';

const Hookc = () => {
  const [name, setName] = useState("parent");

  useEffect(() => {
    //console.log("p-you name is", name);

  }, [name]);

  useEffect(() => {
    console.log("p-useEffect");
    return ()=>{
      console.log("p-useEffect-return");
    }
  });

  useLayoutEffect(()=>{
    console.log("p-useLayoutEffect");
    return ()=>{
      console.log("p-useLayoutEffect-return");
    }
  })

  const unmountHc=()=>{
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
  }

  return (

    <>
      {
        console.log("p-render")
      }
      <h3>---Counter with Hookc---</h3>
      <p>
        <input placeholder="input your name" onChange={e => setName(e.target.value)} />
        <br />
        your name is {name}
      </p>
      <button onClick={unmountHc}>
        unmount
      </button>
      <Hookcitem name={name} />
    </>
  );
};

export default Hookc;
