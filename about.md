### virtual DOM
本质上来讲，virtual dom只是一个简单的js对象，就react来说，通过JSX语法编译生成virtual dom
也即是一个对象，该对象根据属性创建真实DOM.

virtual dom更新时候，根据diff算法对比，针对差异部分更新真实dom.

此外，在进行页面更新的时候，借助virtual dom，DOM 元素的改变可以在内存中进行比较，
再结合框架的事务机制将多次比较的结果合并后一次性更新到页面，从而有效地减少页面渲染的次数，提高渲染效率。

virtual dom对象示例
```javascript
{
    tag: "div",
    props: {},
    children: [
        "Hello World",
        {
            tag: "ul",
            props: {},
            children: [{
                tag: "li",
                props: {
                    id: 1,
                    class: "li-1"
                },
                children: ["第", 1]
            }]
        }
    ]
}
```

virtual dom对象对应真实dom对象
```html
<div>
    Hello World
    <ul>
        <li id="1" class="li-1">
            第1
        </li>
    </ul>
</div>
```
virtual dom 最大的特点是将页面的状态抽象为 JS 对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。如 React 就借助 virtual dom 实现了服务端渲染、浏览器渲染和移动端渲染等功能
