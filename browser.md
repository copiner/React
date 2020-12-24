### 浏览器渲染原理



 ![image](https://github.com/copiner/Groceries/blob/master/imgs/20201224/render.png?raw=true)

#### 渲染流程有下面四个主要步骤：

一、解析HTML生成DOM Tree，解析html文档，生成DOM树，把样式解析生成CSSOM(CSS Object Model)(CSSOM是一组允许JavaScript操作CSS的API。它非常类似于DOM，但是用于CSS而不是HTML)。

二、构建Render Tree，根据DOM树与CSSOM生成另外一棵用于渲染的树 Render Tree。

三、布局(layout)Render Tree，对渲染树的每个节点进行布局处理，确定其在屏幕上的显示位置。

四、绘制(painting)Render Tree，遍历渲染树绘制每个节点


为了提高用户体验，渲染引擎试图尽可能快的把结果显示给最终用户。它不会等到所有HTML都被解析完才创建并布局渲染树。它会在从网络层获取文档内容的同时把已经接收到的局部内容先展示出来


#### reflow && repaint

回流(reflow)：当浏览器发现页面某个部分发生了点变化影响了布局，需要倒回去重新渲染。

重绘(repaint)：改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变


每次Reflow，Repaint后浏览器还需要合并渲染层并输出到屏幕上。所有的这些都会是动画卡顿的原因。
Reflow 的成本比 Repaint 的成本高得多的多。一个结点的 Reflow 很有可能导致子结点，甚至父点以及同级结点的 Reflow。在一些高性能的电脑上，也许还没什么，但是如果 Reflow 发生在手机上，那么这个过程是延慢加载和耗电的。

### 渲染阻塞

现代浏览器总是并行加载资源，例如，当 HTML 解析器（HTML Parser）被脚本阻塞时，解析器虽然会停止构建 DOM，但仍会识别该脚本后面的资源，并进行预加载。
#### HTML

渲染树（Render-Tree）的关键渲染路径中，要求同时具有 DOM 和 CSSOM，之后才会构建渲染树,HTML和CSS都被视为渲染阻塞资源

#### CSS
```
<style> p { color: red; }</style>
<link rel="stylesheet" href="index.css">
```
如上，CSS被视为渲染阻塞资源，CSSOM构建时，意味着浏览器将不会渲染任何已处理的内容，直至CSSOM构建完毕，才会进行下一阶段。


加快渲染当然是精简 CSS 并尽快提供它。除此之外，还可以用媒体类型（media type）和媒体查询（media query）来解除对渲染的阻塞
```
<link href="index.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 30em) and (orientation: landscape)">
```
如上，

第一个资源会加载并阻塞。

第二个资源设置了媒体类型，会加载但不会阻塞，print 声明只在打印网页时使用。

第三个资源提供了媒体查询，会在符合条件时阻塞渲染。

#### JS
JavaScript 被认为是解释器阻塞资源，当浏览器遇到script标记时，HTML解析DOM树构建会被JS阻塞，它不仅可以读取和修改 DOM 属性，还可以读取和修改 CSSOM 属性。

JavaScript 的情况比 CSS 要更复杂一些。如果没有 defer 或 async，浏览器会立即加载并执行指定的脚本，意思是指在渲染该 script 标签之下的HTML元素之前，也就是说不等待后续载入的HTML元素，读到就加载并执行。

`defer` 与 `async` 可以改变之前的那些阻塞情形，这两个属性都会使 script 异步加载，然而执行的时机是不一样的。注意async与defer属性对于inline-script是无效的，所以下面这个示例中三个script标签的代码会从上到下依次执行。

```
<script async>console.log("1")</script>
<script defer>console.log("2")</script>
<script>console.log("3")</script>
```
defer相比普通script，有两点区别：载入JavaScript文件时不阻塞HTML的解析，执行阶段被放到`HTML标签解析完成`(DOMContentLoaded)之后。

async属性表示异步执行引入的JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，无论此刻是HTML解析阶段还是HTML解析完成事件之后。需要注意的是，这种方式加载的JavaScript依然会阻塞 load 事件。换句话说，async可能在`HTML标签解析完成`之前或之后执行，但一定在load触发之前执行。

多个async的执行顺序是不确定的，谁先加载完谁执行。值得注意的是，向 document 动态添加 script 标签时，async 属性默认是 true

使用 document.createElement 创建的 script 默认是异步的，示例如下
```
console.log(document.createElement("script").async); // true
```
所以，通过动态添加 script 标签引入 JavaScript 文件默认是不会阻塞页面的。如果想同步执行，需要将 async 属性人为设置为 false

#### 原则
一、引入顺序上，CSS 资源先于 JavaScript 资源，通常会把css放在头部，js放在body尾部。

二、JavaScript 应尽量少影响 DOM 的构建。

### 优化

优化javascript的执行效率,对于动画效果的实现，避免使用setTimeout或setInterval，请使用requestAnimationFrame
```
function updateScreen(time) {

  // Make visual updates here.

}
requestAnimationFrame(updateScreen);
```
把耗时长的JavaScript代码放到Web Workers中去做
```
const myWorker = new Worker(aURL, options);

```

使用Chrome DevTools的Performance来分析JavaScript的性能
