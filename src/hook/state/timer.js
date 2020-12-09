//生命周期方法要如何对应到 Hook

import React, { useRef,useState,useEffect } from "react";

function Timer(props) {
  const intervalRef = useRef();
  const [ti, setTi] = useState("tick");

  const [clock, setClock] = useState("发送验证码");

  const [prevProps, setPrevProps] = useState(null);

  /*
  你可以在渲染过程中更新 state 。
  React 会立即退出第一次渲染并用更新后的 state 重新运行组件以避免耗费太多性能，

  渲染期间的一次更新恰恰就是 getDerivedStateFromProps 一直以来的概念
  */
  if (props !== prevProps) { //getDerivedStateFromProps
      setPrevProps(props);
  }

  /*
  shouldComponentUpdate
  可以用 React.memo 包裹一个组件来对它的 props 进行浅比较，
  React.memo 等效于 PureComponent，但它只比较 props，

  你也可以通过第二个参数指定一个自定义的比较函数来比较新旧 props。
  如果函数返回 true，就会跳过更新
  */

  if(props !== ""){
    useEffect(() => {
      console.log('shouldComponentUpdate ==')
    })
  }

  useEffect(() => {
    let i = 0;
    console.log('i-'+i)
    const id = setInterval(() => {
      i++;

      console.log("interval-"+i)

      if(i > 5){//i  === 6   7
        console.log("tick-"+i)
        setTi("tick-"+i);
        clearInterval(id)
      }

    },1000);

    intervalRef.current = id;

    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
      console.log('return useEffect')
    };

  });

  const sixty = ()=>{
    let start = 60;
    const timer=setInterval(() => {
       start--;
       setClock(start)
       if(start <= 0){
         clearInterval(timer);
         setClock("发送验证码")
       }
    },1000);
  }


  return (
    <>
      <h1>Timer {ti}</h1>
      <button onClick={sixty}>{clock}</button>
    </>
  );
}

export default Timer
