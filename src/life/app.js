import ReactDOM from "react-dom";
import React from "react";

//old
//import LifeCycle from "./lifec";

//new
import LifeCycle from "./nlifec";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: Math.random() * 100
        };
        console.log('p-constructor');
    }

    propsChange = () => {
        //console.log("propsChange");
        this.setState({
            num: Math.random() * 100
        });
    }

    stateChange = () => {
        //console.log("setLifeCycleState");
        this.refs.rLifeCycle.setTheState();
    }

    lifeCycleUpdate = () => {
        //console.log("forceLifeCycleUpdate");
        this.refs.rLifeCycle.forceItUpdate();
    }

    unmountLifeCycle = () => {
        //这里卸载父组件也会导致卸载子组件
        //console.log("unmountLifeCycle");
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    }

    parentForceUpdate = () => {
        console.log("parentForceUpdate");
        //1-----------
        // this.setState({
        //     num: Math.random() * 100
        // });

        //2---------------
        this.state.num = 9999;
        //默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。
        //如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染
        this.forceUpdate();
    }

    static getDerivedStateFromProps(props, state) {
      //console.log(props)
      //console.log(state)
      console.log('p-getDerivedStateFromProps');

      return null;
    }



    shouldComponentUpdate(nextProps, nextState) {
      // 组件Props或者state改变时触发，true：更新，false：不更新
      console.log('p-shouldComponentUpdate');
      return true
    }

    render() {
        console.log("p-render");
        return (
          <div>
            <ol>
              <li><a onClick={this.propsChange}>propsChange</a></li>
              <li><a onClick={this.stateChange}>stateChange</a></li>
              <li><a onClick={this.lifeCycleUpdate}>lifeCycleUpdate</a></li>
              <li><a onClick={this.unmountLifeCycle}>unmountLifeCycle</a></li>
              <li><a onClick={this.parentForceUpdate}>parentForceUpdateWithoutChange</a></li>
            </ol>
              <LifeCycle ref="rLifeCycle" num={ this.state.num } />
          </div>
        );
    }


    getSnapshotBeforeUpdate(prevProps, prevState) { // 组件更新前触发
      console.log('p-getSnapshotBeforeUpdate');
      return null;
    }

    componentDidMount() { // 挂载后
      console.log('p-componentDidMount');
    }

    componentDidUpdate() { // 组件更新后触发
      console.log('p-componentDidUpdate');
    }

    componentWillUnmount() { // 组件卸载时触发
      console.log('p-componentWillUnmount');
    }


    componentDidCatch(error, info) { // 获取到javascript错误
      console.log('p-componentDidCatch');
    }
}

export default App;
