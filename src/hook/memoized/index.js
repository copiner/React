/*
useEffect、useMemo、useCallback都是自带闭包的。
也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，
所以每一次这三种hooks的执行，反映的也都是当前的状态，
你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用ref来访问
*/
import React from 'react';

import CallBack from './callback';
import Parent from './callback01';
import WithoutMemo from './memo';
import WithMemo from './memo01';


export default function() {

  return (
    <>
      <WithoutMemo />
      <WithMemo/>
    </>
  );
}
