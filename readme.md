### Virtual DOM
1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了


Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）

```javascript
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
上面的`<App />`是虚拟的DOM节点，把它塞入文档中，这样body里面就有了真正的DOM节点。

### diff
比较两棵DOM树的差异是 Virtual DOM 算法最核心的部分，这也是所谓的 Virtual DOM 的 diff 算法。两个树的完全的 diff 算法是一个时间复杂度为 O(n^3) 的问题。但是在前端当中，你很少会跨越层级地移动DOM元素。所以 Virtual DOM 只会对同一个层级的元素进行对比。这样算法复杂度就可以达到 O(n)。

### DOM
浏览器上呈现的html文档，本质上来说是一种xml，我们可以用一种树状结构把html文档描述出来.

React在呈现的过程中，会首先根据render的结果将树状结构在js里创建出来（注意，这个时候并没有操作DOM），这个树状结构就是虚拟DOM层。React会将这个新的虚拟DOM和正在呈现的虚拟DOM进行对比，并找出其中的差异，然后用最少的DOM操作完成这个更新。

这里需要注意到，以上这些操作都是在js里完成的（生成虚拟DOM，比对），并没有实际操作DOM元素，比对完毕后找出的差异才会实际操作DOM元素，比如移除掉一个节点，更新其他节点的属性。

### References
[livoras](https://github.com/livoras/blog/issues/13)

[Matt-Esch](https://github.com/Matt-Esch/virtual-dom/blob/master/vtree/diff.js)
