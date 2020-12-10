
import React, { useState, useCallback } from "react";

let count = 0;

function Child({val, getData}) {
   useEffect(() => {
     getData();
   }, [getData]);
   return <div>{val}</div>;
}


function App() {
    const [val, setVal] = useState("");

    const getData = useCallback(() => {
       console.log(val);
       setTimeout(() => {
         setVal("new data " + count);
         count++;
       }, 500);
    }, [val])

    return <Child val={val} getData={getData} />;
}
