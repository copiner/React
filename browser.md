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

#### CSS
CSS被视为渲染阻塞资源，CSSOM构建时，意味着浏览器将不会渲染任何已处理的内容，直至CSSOM构建完毕，才会进行下一阶段。

#### JS
JavaScript 被认为是解释器阻塞资源，当浏览器遇到script标记时，HTML解析DOM树构建会被JS阻塞，它不仅可以读取和修改 DOM 属性，还可以读取和修改 CSSOM 属性。

#### 原则
一、引入顺序上，CSS 资源先于 JavaScript 资源。

二、JavaScript 应尽量少影响 DOM 的构建。

### 细节
