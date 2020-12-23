import React, { useRef,useState,useEffect } from "react";

function Poses(props) {
  console.log(props)
  const mousedown = (e) =>{

   var target = event.target;
   var disX = event.pageX - target.offsetLeft;
   var disY = event.pageY - target.offsetTop;
   var W = props.w-target.offsetWidth;
   var H = props.h-target.offsetHeight;

   document.onmousemove = function(event){
     event.preventDefault();
     var l = event.pageX - disX;
     var t = event.pageY - disY;
     if(l<0){
       l = 0;
     }
     if(l>W){
       l = W ;
     }
     if(t<0){
       t = 0;
     }
     if(t>H){
       t = H;
     }
     console.log(t, l)
     target.style.top = t+ 'px';
     target.style.left = l+'px';

   }
   target.onmouseup = function(){
     document.onmousemove = null;
     target.onmouseup = null;
   }

  }


  return (
    <>
      <div style={{width:"200px", height:"200px", background:"grey"}} onMouseDown={(e)=>mousedown(e)}></div>
    </>
  )
}

export default Poses
