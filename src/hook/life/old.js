import React, {useState,useEffect, useRef} from "react";

function Old() {
  const saveRef = useRef();
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      console.log('You clicked on: ' + count);
      console.log('You clicked on: ' + saveRef.current);
    }, 3000);
  }

  useEffect(() => {
      saveRef.current = count;
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show old
      </button>
    </div>
  );
}
export default Old
