/*
在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用

然而，并非所有 effect 都可以被延迟执行。
例如，在浏览器执行下一次绘制前，用户可见的 DOM 变更就必须同步执行，这样用户才不会感觉到视觉上的不一致
React为此提供了useLayoutEffect Hook来处理这类 effect。
它和 useEffect 的结构相同，区别只是调用时机不同


虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。
React 将在组件更新前刷新上一轮渲染的 effect
*/
import React from 'react';

import { useState, useEffect } from 'react';

const Sample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("heaven");

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  useEffect(() => {
    console.log("you name is", name);
  }, [name]);

  return (
    <div>
      <h3>Counter with Hook</h3>
      <p>You click {count} times</p>
      <button onClick={e => setCount(count => count + 1)}>Click me</button>
      <p>
        <input placeholder="input your name" onChange={e => setName(e.target.value)} />
        <br />
        your name is {name}
      </p>
    </div>
  );
};

export default Sample;
