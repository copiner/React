import React, { Component } from 'react'

export default class NewReactComponent extends Component {
    constructor(props) {
        super(props)
        // getDefaultProps：接收初始props
        // getInitialState：初始化state
        console.log('getDefaultProps');
        console.log('getInitialState');
        this.state = {
          str:"wdaonngg"
        }
    }

    defaultProps = {
      color: 'blue'
    }
    
    /*
    state = {
      str:"wdaonngg"
    }
    */
    setTheState = () =>  {
      console.log("setTheState");
      let s = "wdaonngg";
      if (this.state.str === s) {
          s = "wrq";
      }
      this.setState({
          str: s
      });
    }

    forceItUpdate = () => {
      console.log("forceItUpdate");
      this.forceUpdate();
    }

    static getDerivedStateFromProps(props, state) {

      console.log('getDerivedStateFromProps');

      return null;
    }

    /*
    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染可以显降级 UI
    }*/

    componentDidCatch(error, info) { // 获取到javascript错误
      console.log('componentDidCatch');
    }

    render() {
      console.log("render");
      return (
        <div>
            <div>{"Props:"}<h2>{parseInt(this.props.num)}</h2><h2>{this.props.color}</h2></div>
            <div>{"State:"}<h2>{this.state.str}</h2></div>
        </div>
      )
    }

    componentDidMount() { // 挂载后
      console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
      // 组件Props或者state改变时触发，true：更新，false：不更新
      console.log('shouldComponentUpdate');
      return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) { // 组件更新前触发
      console.log('getSnapshotBeforeUpdate');
      return null;
    }

    componentDidUpdate() { // 组件更新后触发
      console.log('componentDidUpdate');
    }

    componentWillUnmount() { // 组件卸载时触发
      console.log('componentWillUnmount');
    }
}

// NewReactComponent.defaultProps = {
//   color: 'blue'
// }
