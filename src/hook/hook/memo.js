import React, { useState, useCallback, useMemo, memo } from "react";
/*
useCallback useMemo 性能优化

每次父组件更新，子组件都会更新Count。如下版本使用memo，父组件变化子组件没有更新

当父组件传递状态给子组件的时候，memo好像没什么效果，子组件还是执行了，
这时候我们就要引入hooks的useCallback、useMemo这两个钩子了
*/
function Counter(props) {
  console.log(props)
  //useState 会返回一个数组，第1个元素是当前状态 第2个元素是设置状态的方法
  //1.setState特点1可以修改状态 2.状态修改完成后组件会刷新
  let [state, setState] = useState( { number: 0});
  console.log("Counter");
  return (
   <div>
   <p>
   {state.number}
   </p>
   <button onClick={() => setState({ number: state.number + 1})} >
   +
   </button>
   </div>
  );
}

function Coter(props) {
  console.log(props)
  console.log("Coter");
  return (
   <div>
   <p>
   {props.data.number}
   </p>
   </div>
  );
}

function Con() {

  console.log("CON");
  return (
   <div>
    CON
   </div>
  );
}

function Count(props) {
  console.log("COUNT");
  console.log(props)
  return (
   <div>
    COUNT
   </div>
  );
}

//memo 缓存返回的新组件，如果组件的属性不改变，则不刷新 类 PureComponent
let MemoMyCounter = memo(Counter);
let MemoMyCount = memo(Count);

function App() {
  let [state, setState] = useState({ number: 0 });
  let [value, setValue] = useState("");
  console.log("render App");

  console.log('state---', state)
  //本意是地函数进行缓存
  //useCallback第2个参数是依赖的变量的数组 当数组中变量发生改变后，就会重新生成生成新的函数
  let onButtonClick = useCallback(() => {
   setState({ number: state.number + 1 });
  }, [state]);

  let data = useMemo(() => ({ number: state.number }), [state]);

  return (
   <div>
     <input value={value} onChange={(event) => setValue(event.target.value)} />
     <p>{state.number}</p>
     <button onClick={() => setState({ number: state.number + 1})} >+</button>
     <MemoMyCounter />
     <MemoMyCount value={value} />
     <MemoMyCount data={data} />
     <Con/>
   </div>
  );
}
export default App
