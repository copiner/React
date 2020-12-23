/*
const [state, setState] = useState(initialState);

setState 函数用于更新 state。
它接收一个新的 state 值并将组件的一次重新渲染加入队列
*/


/*
initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
如果初始 state 需要通过复杂计算获得，
则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
*/

import React, { useState } from 'react';

const initialCount = 0;

function someExpensiveComputation(props){
  for(let i=0; i<10000;i++){
    props += i;
  }
  return props;
}

function Counter() {
  const [count, setCount] = useState(initialCount);
  /*
  如果初始 state 需要通过复杂计算获得，则可以传入一个函数，
  在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
  */
  const [state, setState] = useState(() => {
    let rand = Math.floor(Math.random()*10+1);
    const initialState = someExpensiveComputation(rand);
    return initialState;
  });


  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      state: {state}
    </>
  );
}

export default Counter
