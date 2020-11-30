import React, {useState, useCallback} from "react";
import Timer from "./timer";
import Counter from "./prev";
import Old from "./old";
import { useInterval } from './useInterval';

function Measure() {
  const [height, setHeight] = useState(0);
  const [hi, setHi] = useState("hi");

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);


  const [delay, setDelay] = useState(null);
  let i = 0;
  useInterval(()=>{
    i++;
    console.log(i)
    if(i > 10){
      setDelay(null)
    }

  }, delay)

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
      <p>{hi}</p>
      <button onClick={()=>{setDelay(1000)}}>START</button>
      <button onClick={()=>{setDelay(null)}}>END</button>
      <Timer hi={hi}/>
      <Counter/>
      <Old/>
    </>
  );
}

export default Measure
