/*
useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数
*/
import React, { useState, useMemo } from "react";

import Memod from './memo02';

export default function WithMemo(){
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');

    //控制台compute
    const expensive = useMemo(() => {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

    return <div>
        <h4>{count}-{expensive/*useMemo返回缓存的变量*/}-{val}</h4>

        <div>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>

            <button onClick={() => {setCount(1); setValue("abc")}}>RESET</button>
            <Memod count={count}/>
        </div>
    </div>;
}
