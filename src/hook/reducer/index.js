/*
useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，
并返回当前的 state 以及与其配套的 dispatch方法
*/

import React, { useReducer } from 'react';
import Second from './second';

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </div>
    <Second initialCount={0}/>
    </>
  );
}

export default Counter;
