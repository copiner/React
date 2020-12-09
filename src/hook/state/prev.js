import React, { useRef,useState,useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


function Counter(props) {
  console.log(props)
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <>
      <p>---{props.p.cur+","+props.p.old}---</p>
      <p>Now: {count}, before: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>

  )
}


export default Counter

// function Counter() {
//   const [count, setCount] = useState(0);
//
//   const prevCountRef = useRef();
//   useEffect(() => {
//     prevCountRef.current = count;
//   });
//   const prevCount = prevCountRef.current;
//
//   return (
//     <>
//       <h1>Now: {count}, before: {prevCount}</h1>
//       <button onClick={() => setCount(count + 1)}>+</button>
//     </>
//
//   )
// }
