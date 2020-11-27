import React, { useRef,useState,useEffect } from "react";

function Timer() {
  const intervalRef = useRef();
  const [click, setClick] = useState("发送验证码");

  let t = 60;
  const didad = ()=>{
    //console.log(t)
    t--;
  }

  useEffect(() => {

    const id = setInterval(() => {
      didad()
    },1000);
    intervalRef.current = id;
    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    };

  });

  const sixty = ()=>{
    let start = 60;
    const timer=setInterval(() => {
       start--;
       setClick(start)
       if(start <= 0){
         clearInterval(timer);
         setClick("发送验证码")
       }
    },1000);
  }


  return (
    <>
      <h1>Timer</h1>
      <button onClick={sixty}>{click}</button>
    </>
  );
}

export default Timer
