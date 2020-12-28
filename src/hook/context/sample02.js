
//如何避免向下传递回调
import React, { useReducer, useContext } from 'react';

const TodosDispatch = React.createContext(null);

function todosReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}



function Todos() {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepChild todos={todos} />
    </TodosDispatch.Provider>
  );
}

/*
TodosApp 内部组件树里的任何子节点都可以使用 dispatch
函数来向上传递 actions 到 TodosApp

总而言之，从维护的角度来这样看更加方便（不用不断转发回调），
同时也避免了回调的问题。
像这样向下传递 dispatch 是处理深度更新的推荐模式
*/

function DeepChild(props) {
  //如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}

export default Todos
