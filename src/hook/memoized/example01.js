/*
react中的性能优化。在hooks诞生之前，如果组件包含内部state，
我们都是基于class的形式来创建组件。当时我们也知道，react中，性能的优化点在于：

调用setState，就会触发组件的重新渲染，无论前后的state是否不同
父组件更新，子组件也会自动的更新
基于上面的两点，我们通常的解决方案是：
使用immutable进行比较，在不相等的时候调用setState；在
shouldComponentUpdate中判断前后的props和state，如果没有变化，则返回false来阻止更新。

在hooks出来之后，我们能够使用function的形式来创建包含内部state的组件。
但是，使用function的形式，失去了上面的shouldComponentUpdate，
我们无法通过判断前后状态来决定是否更新。而且，在函数组件中，react不再区分mount和update两个状态，
这意味着函数组件的每一次调用都会执行其内部的所有逻辑，那么会带来较大的性能损耗。
因此useMemo 和useCallback就是解决性能问题的杀手锏。


useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数
*/

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

    function getData() {
      setTimeout(() => {
        setVal("new data " + count);
        count++;
      }, 500);
    }

    const getData = useCallback(() => {
       setTimeout(() => {
         setVal("new data " + count);
         count++;
       }, 500);
    }, []);

    return <Child val={val} getData={getData} />;
}
