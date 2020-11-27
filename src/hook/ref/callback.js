import React, {useState, useCallback} from "react";
import Timer from "./timer";
import { useInterval } from './useInterval';

function Measure() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  let t = 60;
  const [delay, setDelay] = useState(null);

  useInterval(()=>{

    t--;
    console.log(t)
    if(t <= 0){
      setDelay(null);//暂停计时器
    }
  }, delay)

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
      <button onClick={()=>{setDelay(1000)}}>START</button>
      <p>{t}</p>
      <Timer/>
    </>
  );
}

export default Measure
