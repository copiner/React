使用 virtual dom 的框架，一般的设计思路都是页面等于页面状态的映射，即UI = render(state)。
当需要更新页面的时候，无需关心 DOM 具体的变换方式，只需要改变state即可，剩下的事情（render）将由框架代劳。
我们考虑最简单的情况，当 state 发生变化时，我们重新生成整个 virtual dom ，触发比较的操作。
上述过程分为以下四步:

1. state 变化，生成新的 virtual dom
2. 比较 virtual dom 与之前 virtual dom 的异同
3. 生成差异对象（patch）
4. 遍历差异对象并更新 DOM

差异对象的数据结构是下面这个样子，与每一个 virtual dom 元素一一对应：
```javascript
{
    type,
    vdom,
    props: [{
               type,
               key,
               value
            }]
    children
}
```

最外层的 type 对应的是 DOM 元素的变化类型，有 4 种：新建、删除、替换和更新。props 变化的 type 只有2种：更新和删除。枚举值如下：

```javascript
const nodePatchTypes = {
    CREATE: 'create node',
    REMOVE: 'remove node',
    REPLACE: 'replace node',
    UPDATE: 'update node'
}

const propPatchTypes = {
    REMOVE: 'remove prop',
    UPDATE: 'update prop'
}
```
