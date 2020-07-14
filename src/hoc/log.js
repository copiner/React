import React from 'react'

//HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能
//hoc logProps
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}
export default logProps;
