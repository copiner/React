import ReactDOM from "react-dom";
import React from "react";
import LifeCycle from "./lifec";

class App  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: Math.random() * 100
        };
    }

    propsChange() {
        console.log("propsChange");
        this.setState({
            num: Math.random() * 100
        });
    }

    stateChange() {
        console.log("setLifeCycleState");
        this.refs.rLifeCycle.setTheState();
    }

    lifeCycleUpdate() {
        console.log("forceLifeCycleUpdate");
        this.refs.rLifeCycle.forceItUpdate();
    }

    unmountLifeCycle() {
        // 这里卸载父组件也会导致卸载子组件
        console.log("unmountLifeCycle");
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    }

    parentForceUpdate() {
        console.log("parentForceUpdate");
        // this.setState({
        //     num: Math.random() * 100
        // });
        this.forceUpdate();
    }

    render() {
        return (
          <div>
            <ol>
              <li><a onClick={this.propsChange.bind(this)}>propsChange</a></li>
              <li><a onClick={this.stateChange.bind(this)}>stateChange</a></li>
              <li><a onClick={this.lifeCycleUpdate.bind(this)}>lifeCycleUpdate</a></li>
              <li><a onClick={this.unmountLifeCycle.bind(this)}>unmountLifeCycle</a></li>
              <li><a onClick={this.parentForceUpdate.bind(this)}>parentForceUpdateWithoutChange</a></li>
            </ol>
              <LifeCycle ref="rLifeCycle" num={ this.state.num } />
          </div>
        );
    }
}

export default App;
