/*
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数
*/

import React, { useState, useCallback } from "react";

const Child = React.memo( ({ val, onChange }) => {
  console.log("render");
  return <input value={val} onChange={onChange} />;
});

function App() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");

  /*
  控制台查看render打印次数，运用useCallback进行性能优化
  */
  const onChange1 = evt => {
    setVal1(evt.target.value);
  };
  // const onChange1 = useCallback(evt => {
  //   setVal1(evt.target.value);
  // }, []);
  const onChange2 = useCallback(evt => {
    setVal2(evt.target.value);
  }, []);

  return (
    <>
      <Child val={val1} onChange={onChange1} />
      <Child val={val2} onChange={onChange2} />
    </>
  );
}

export default App;
