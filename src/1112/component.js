/*
在React中，所有自定义组件都要继承Component基类，
它为我们提供了一系列生命周期方法和修改组件的方法。
我们也对应的定义一个自己的Component类
*/
class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        const vdom = this.render();
        diff(this.dom, vdom, this.parent);
    }

    render() {
        throw new Error('component should define its own render method')
    }
};

export default Component;
