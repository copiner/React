
import React from "react";

function Base(props){
  console.log("b-render")
  return <span>{props.count}</span>
}

export default React.memo(Base);
//export default Base
