import React from 'react';
import ReactDOM from 'react-dom';

import logProps from './log'

import withSubscription from './subscription'

//Comment
function Comment(props) {
  //console.log(props)
  return <p>Hello, Comment</p>;
}

//Blog
function Blog(props) {
  //console.log(props)
  return <p>Hello, Blog</p>;
}


const Commented = withSubscription(
  logProps(Comment),
  (DataSource, props) => DataSource.combined(props.comments)
);

const Bloged = withSubscription(
  Blog,
  (DataSource, props) => DataSource.combined(props.blogs)
);


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments:{
        title:'nao',
        content:'nao yuutylop vetu, I re kow',
        status:0
      },
      blogs:{
        title:'kop',
        content:'kop yuutylop yup vetu, kow',
        status:0
      }
    }

  }

  propsChange = () => {
    this.setState({
        ...this.state,
        comments:{
          title:'per',
          content:'nao to per tylop vetu, I re kow',
          status:0
        }
    });
  }


  unmountComp = () => {
      ReactDOM.unmountComponentAtNode(document.getElementById("root"));
  }

  render() {
    return (
      <div>
        <Bloged blogs = {this.state.blogs}/>
        <Commented comments = {this.state.comments}/>
        <p onClick={this.propsChange}>propsChange</p>
        <p onClick={this.unmountComp}>unmount</p>
      </div>
    );
  }

  componentDidMount(){

  }

  componentWillUnmount() {

  }
}


let render = () =>{
  ReactDOM.render(
    <div>
      <App/>
    </div>,
    document.getElementById('root')
  );
}

export default render;
