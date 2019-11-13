/*
在React中，所有自定义组件都要继承Component基类，
它为我们提供了一系列生命周期方法和修改组件的方法。
我们也对应的定义一个自己的Component类
*/

let pendingRenderComponents = [];
class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        enqueueRender(this);
    }

    render() {
        throw new Error('component should define its own render method')
    }
};


function enqueueRender(component) {
    // 如果push后数组长度为1，则将异步刷新任务加入到事件循环当中
    if (pendingRenderComponents.push(component) == 1) {
        if (typeof Promise=='function') {
            Promise.resolve().then(renderComponent);
        } else {
            setTimeout(renderComponent, 0);
        }
    }
}

function renderComponent() {
    // 组件去重
    const uniquePendingRenderComponents = [...new Set(pendingRenderComponents)];

    // 渲染组件
    uniquePendingRenderComponents.forEach(component => {
        const vdom = component.render();
        diff(component.dom, vdom, component.parent);
    });

    // 清空待渲染列表
    pendingRenderComponents = [];
}

export default Component;
