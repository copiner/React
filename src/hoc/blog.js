import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange = () => {
    this.setState({
      blog: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blog} />;
  }
}

export default Blog;
