import React, {useState, useCallback} from "react";

export default function Measure() {
  const [height, setHeight] = useState(0);
  const [val, setValue] = useState('');

  const measuredRef = useCallback(node => {
    console.log('m f')
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  //注意到我们传递了 [] 作为 useCallback 的依赖列表。
  //这确保了 ref callback 不会在再次渲染时改变，
  //因此 React 不会在非必要的时候调用它
  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
      <input value={val} onChange={event => setValue(event.target.value)}/>
    </>
  );
}
