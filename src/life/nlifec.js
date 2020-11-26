/*
init:

p-constructor
p-getDerivedStateFromProps
p-render
c-constructor
c-getDerivedStateFromProps
c-render
c-componentDidMount
p-componentDidMount

parent state change || child props change:

p-getDerivedStateFromProps
p-shouldComponentUpdate
p-render
c-getDerivedStateFromProps
c-shouldComponentUpdate
c-render
c-getSnapshotBeforeUpdate
p-getSnapshotBeforeUpdate
c-componentDidUpdate
p-componentDidUpdate


child state change:
c-getDerivedStateFromProps
c-shouldComponentUpdate
c-render
c-getSnapshotBeforeUpdate
c-componentDidUpdate
*/
import React, { Component } from 'react'

export default class NewReactComponent extends Component {
    constructor(props) {
        super(props)
        // getDefaultProps：接收初始props
        // getInitialState：初始化state
        this.state = {
          str:"wdaonngg"
        }
        console.log('c-constructor');
    }

    static defaultProps = {
      color: 'blue'
    }

    /*
    state = {
      str:"wdaonngg"
    }
    */
    setTheState = () =>  {

      let s = "wdaonngg";
      if (this.state.str === s) {
          s = "wrq";
      }
      this.setState({
          str: s
      });
    }

    forceItUpdate = () => {
      console.log("c-forceItUpdate");
      this.forceUpdate();
    }

    static getDerivedStateFromProps(props, state) {
      //console.log(props)
      //console.log(state)
      console.log('c-getDerivedStateFromProps');

      return null;
    }

    /*
    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染可以显降级 UI
    }*/


    shouldComponentUpdate(nextProps, nextState) {
      // 组件Props或者state改变时触发，true：更新，false：不更新
      console.log('c-shouldComponentUpdate');
      return true
    }


    render() {
      console.log("c-render");
      return (
        <div>
            <div>{"Props:"}<h2>{parseInt(this.props.num)}</h2><h2>{this.props.color}</h2></div>
            <div>{"State:"}<h2>{this.state.str}</h2></div>
        </div>
      )
    }

    getSnapshotBeforeUpdate(prevProps, prevState) { // 组件更新前触发
      console.log('c-getSnapshotBeforeUpdate');
      return null;
    }

    componentDidMount() { // 挂载后
      console.log('c-componentDidMount');
    }

    componentDidUpdate() { // 组件更新后触发
      console.log('c-componentDidUpdate');
    }

    componentWillUnmount() { // 组件卸载时触发
      console.log('c-componentWillUnmount');
    }


    componentDidCatch(error, info) { // 获取到javascript错误
      console.log('c-componentDidCatch');
    }
}

// NewReactComponent.defaultProps = {
//   color: 'blue'
// }
