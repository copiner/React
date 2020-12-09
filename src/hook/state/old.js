import React, {useState,useEffect, useRef} from "react";
import Counter from "./prev";

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
      console.log("old useEffect")
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
      <Counter p={{cur:count, old:saveRef.current}}/>
    </div>
  );
}
export default Old
