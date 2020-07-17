import React, { useState, useEffect } from 'react';
/*
Hooks are functions that let you “hook into” React state and lifecycle features from function components.
*/
export default function() {
  //useState returns a pair: the current state value and a function that lets you update it.
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  /*
  If you’re familiar with React class lifecycle methods, you can think of useEffect Hook
  as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

  If your effect returns a function, React will run it when it is time to clean up

  this is the optional cleanup mechanism for effects.
  Every effect may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other.
  They’re part of the same effect
  */
  useEffect(() => {//side effects
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <ul>{
        todos.map((item,i)=>{
          return <li key={i}>{item.text}</li>
        })
      }</ul>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}


/*

*/
