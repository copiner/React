import React, { useRef,useState,useEffect } from "react";

//自定义hook
function useWindowPosition(el) {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({left: e.pageX, top: e.pageY });
    }
    console.log(el)
    if(el){
      el.addEventListener('mousemove', handleWindowMouseMove);
      return () => el.removeEventListener('mousemove', handleWindowMouseMove);
    }
  }, []);
  return position;
}

function Boxes() {
  const divEl = useRef(null);
  const [el, setEl] = useState(null);

  const [size, setSize] = useState({ width: 100, height: 100 });

  const position = useWindowPosition(el);//

  useEffect(()=>{
    setEl(divEl.current)
    console.log("divEl useEffect")
  },[divEl])


  return (
    <>
    <div ref={divEl} style={{width:"200px", height:"200px", background:"grey"}}></div>
    <p>{"left: "+position.left + " top: "+position.top}</p>
    </>
  )
}

export default Boxes
