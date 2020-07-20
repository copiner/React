import React, { useState, useCallback } from "react";

const Child = React.memo( ({ val, onChange }) => {
  return <input value={val} onChange={onChange} />;
});

function App() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");

  const onChange1 = useCallback(evt => {
    setVal1(evt.target.value);
  }, []);

  const onChange2 = useCallback(evt => {
    setVal2(evt.target.value);
  }, []);

  return (
    <>
      <Child val={val1} onChange={onChange1} />
      <Child val={val2} onChange={onChange2} />
    </>
  );
}

export default App;
