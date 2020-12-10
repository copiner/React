/*
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数
*/


import React, { useState, useCallback } from 'react';

const set = new Set();

/*
useCallback
判断返回的函数是否变更，所以我们可以借助ES6新增的数据类型Set来判断
每次修改count，set.size就会+1，这说明useCallback依赖变量count，count变更时会返回新的函数；
而val变更时，set.size不会变，说明返回的是缓存的旧版本函数
*/

export default function Callback() {
    const [count, setCount] = useState(1);
    const [val, setVal] = useState('');

    const callback = useCallback(() => {
        console.log(count);
    }, [count]);

    const items = set.add(callback);

    const array = Array.from(items);
    console.log(array);


    return <div>
        <h4>{count}</h4>
        <h4>{set.size}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <input value={val} onChange={event => setVal(event.target.value)}/>
        </div>
    </div>;
}
