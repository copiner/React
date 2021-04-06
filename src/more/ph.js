

import React,{ useRef, useEffect } from 'react';

const Child = props => {

  const func = () => {
    console.log('yep!');
  }

  //props.onRef.current = func;
  useEffect(()=>{
      props.onRef.current = {cf:func};
  },[props.onRef])


  return <div>CHILD</div>;
};


const Ph = () => {
  const ChildRef = useRef(null);

  function handleOnClick() {
    ChildRef.current.cf();
  }

  return (
    <div>
      <button onClick={handleOnClick}>click</button>
      <Child onRef={ChildRef} />
    </div>
  );
};

export default Ph;
