import React, { useRef,useState,useEffect } from "react";

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


function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <>
      <h1>Now: {count}, before: {prevCount}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>

  )
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default Counter
