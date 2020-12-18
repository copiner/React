import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      //在这不依赖于外部的 `count` 变量
      //此时，setInterval 的回调依旧每秒调用一次，
      //但每次 setCount 内部的回调取到的 count 是最新值（在回调中变量命名为 c）。
      setCount(c => c + 1)
    }, 1000);
    return () => clearInterval(id);
  }, []); //我们的 effect 不适用组件作用域中的任何变量

  return <h1>{count}</h1>;
}


// function Counter() {
//   const [count, setCount] = useState(0);
//
//   useEffect(() => {
//     const id = setInterval(() => {
//       setCount(count + 1); //这个 effect 依赖于 `count` state
//     }, 1000);
//     return () => clearInterval(id);
//   }, []); //Bug: `count` 没有被指定为依赖
//
//   return <h1>{count}</h1>;
// }

export default Counter
