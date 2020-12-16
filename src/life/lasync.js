/**
*
constructor：函数组件不需要构造函数。你可以通过调用 useState 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 useState。
getDerivedStateFromProps：改为 在渲染时 安排一次更新。
shouldComponentUpdate：运用 React.memo.
render：这是函数组件体本身。
componentDidMount, componentDidUpdate, componentWillUnmount：useEffect Hook 可以表达所有这些(包括 不那么 常见 的场景)的组合。
getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法，但很快会被添加
*/
import React from 'react';
import ReactDOM from "react-dom";
import Lasyncitem from "./lasyncitem";
import { useState, useEffect,useMemo } from 'react';

const Lasync = () => {
  const [name, setName] = useState("parent");
  const [count, setCount] = useState(0);

  useEffect(() => {
    //console.log("p-you name is", name);
  }, [name]);

  useEffect(() => {
    console.log("p-useEffect");
    return ()=>{
      console.log("p-useEffect-return");
    }
  });

  const unmountHc=()=>{
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
  }


  useEffect(() => {
    const timeout = setTimeout(() => {
      setName("init")
    }, 3000)
    return () => {
       clearTimeout(timeout);
    }
  }, [count]);

  const arrive = () =>{
    setTimeout(() => {
      setName("arrive");
    }, 3000)
  }

  // const Item = React.memo((props) => {
  //   Lasyncitem
  // });

  const child = useMemo(() => <Lasyncitem name={name} />, [name]);

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
      <button onClick={() => setCount(count + 1)}>late</button>
      <button onClick={arrive}>arrive</button>
      <button onClick={unmountHc}>unmount</button>
      {
        /*
        <Lasyncitem name={name} />
        */
        child
      }

    </>
  );
};

export default Lasync;


//sample
const Arrive = (props) => {
  const { alert: { id, ttl }, handlePopAlert } = this.props
  useEffect(() => {
    const timeout = setTimeout(() => {
       handlePopAlert(id)
    }, ttl)
    return () => {
       clearTimeout(timeout);
    }
  }, [id, ttl]);

  return alert
}
