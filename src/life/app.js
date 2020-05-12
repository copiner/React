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

    render() {
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
}

export default App;
