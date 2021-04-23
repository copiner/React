
import React, { useImperativeHandle } from 'react';

const Child = props => {
  //用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(props.onRef, () => {
    return {
      func: func,
    };
  });
  function func() {
    console.log('yep!');
  }
  return <div>CHILD</div>;
};


const Parent = () => {
  let ChildRef = React.createRef();

  function handleOnClick() {
    ChildRef.current.func();
  }

  return (
    <div>
      <button onClick={handleOnClick}>click</button>
      <Child onRef={ChildRef} />
    </div>
  );
};

export default Parent;
