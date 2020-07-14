import React from 'react'
import DataSource from './source'
// ...接收一个组件...
function withSubscription(WrappedComponent, combined) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: combined(DataSource, props)
      };
    }

    componentDidMount() {
      DataSource.addChange(this.handleChange);
      console.log(DataSource);
    }

    componentWillUnmount() {
      DataSource.removeChange(this.handleChange);
      console.log(DataSource);
    }

    handleChange = () => {
      this.setState({
        data: combined(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

export default withSubscription;
