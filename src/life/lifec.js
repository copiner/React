import React from "react";

class LifeCycle extends React.Component {
    constructor(props) {
        super(props);
        console.log("getDefaultProps");
        //对于每个组件实例来讲，这个方法只会调用一次，该组件类的所有后续应用，getDefaultPops 将不会再被调用，
        //其返回的对象可以用于设置默认的 props(properties的缩写)值。也可以在挂载组件的时候设置 props。
        this.state = {str: "Anna"};
        console.log("getInitialState");
        //对于组件的每个实例来说，这个方法的调用有且只有一次，用来初始化每个实例的 state，
        //在这个方法里，可以访问组件的 props。每一个React组件都有自己的 state，
        //其与 props 的区别在于 state只存在组件的内部，props 在所有实例中共享。
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    componentDidMount() {
        //除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate
        //React数据获取一定要在componentDidMount里面调用
        //你要获取外部数据并加载到组件上，只能在组件"已经"挂载到真实的网页上才能作这事情
        //componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载
        console.log("componentDidMount");
        //ReactDOM.findDOMNode()
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate");
        return true;        // 记得要返回true
    }

    componentWillUpdate() {
        console.log("componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    setTheState() {
        console.log("setTheState");
        let s = "Francisco";
        if (this.state.str === s) {
            s = "ANNA";
        }
        this.setState({
            str: s
        });
    }

    forceItUpdate() {
        console.log("forceItUpdate");
        this.forceUpdate();
    }

    render() {
        console.log("render");
        return(
            <div>
                <div>{"Props:"}<h2>{parseInt(this.props.num)}</h2></div>
                <div>{"State:"}<h2>{this.state.str}</h2></div>
            </div>
        );
    }
}
export default LifeCycle;
