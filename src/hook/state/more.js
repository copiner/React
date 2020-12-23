import React, { useState } from 'react';

/*

function Table(props) {
  //createRows() 每次渲染都会被调用
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}

*/


function Table(props) {
  //createRows() 只会被调用一次
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}

/*
function Image(props) {
  //IntersectionObserver 在每次渲染都会被创建
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
*/

function Image(props) {
  const ref = useRef(null);

  //IntersectionObserver 只会被惰性创建一次
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // 当你需要时，调用 getObserver()
  // ...
}
