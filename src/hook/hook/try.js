import React from 'react';

import { useState, useEffect } from 'react';

const TryHook = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("heaven");

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  useEffect(() => {
    console.log("you name is", name);
  }, [name]);

  return (
    <div>
      <h3>Counter with Hook</h3>
      <p>You click {count} times</p>
      <button onClick={e => setCount(count => count + 1)}>Click me</button>
      <p>
        <input placeholder="input your name" onChange={e => setName(e.target.value)} />
        <br />
        your name is {name}
      </p>
    </div>
  );
};

export default TryHook;
