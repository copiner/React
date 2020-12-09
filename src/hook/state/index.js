import React, {useState} from "react";
import Timer from "./timer";
import Old from "./old";
import { useInterval } from './useInterval';

function Measure() {
  const [hi, setHi] = useState("hello");

  const [delay, setDelay] = useState(null);

  let i = 0;
  useInterval(()=>{
    i++;
    if(i > 5){
      console.log('in-'+i)
      setDelay(null);
      setHi("world");
    }

  }, delay)

  return (
    <>
      <p>{hi}</p>
      <button onClick={()=>{setDelay(1000)}}>START</button>
      <button onClick={()=>{setDelay(null)}}>END</button>
      {
        /*
        <Timer hi={hi}/>
        */
      }
      <Old/>
    </>
  );
}

export default Measure
