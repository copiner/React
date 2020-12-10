import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";

// 用于记录 getData 调用次数
let count = 0;

function useRefCallback(fn, dependencies) {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}


function Child({ val, getData }) {
  useEffect(() => {
    getData();
  }, [getData]);

  return <div>{val}</div>;
}


function App() {
  const [val, setVal] = useState("");

  const getData = useRefCallback(() => {
    console.log(val);

    setTimeout(() => {
      setVal("new data " + count);
      count++;
    }, 500);
  }, [val]);

  return <Child val={val} getData={getData} />;
}

export default App
