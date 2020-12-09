import React, { useRef,useState,useEffect } from "react";
import Boxes from "./boxes";
import Poses from "./pos";
function Box() {
  const divEl = useRef(null);

  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      // 展开 「...state」 以确保我们没有 「丢失」 width 和 height
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    }
    //注意：这是个简化版的实现
    divEl.current.addEventListener('mousemove', handleWindowMouseMove);
    return () => divEl.current.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);

  return (
    <>
    <div ref={divEl} style={{width:"200px", height:"200px", background:"grey"}}></div>
    <p>{"left: "+state.left + " top: "+state.top}</p>

    <Boxes/>

    <Poses h={document.documentElement.clientHeight} w={document.documentElement.clientWidth}/>
    </>
  )
}

export default Box
