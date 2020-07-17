/*
 a render prop is a function prop that a component uses to know what to render.
*/
import React from 'react';
import ReactDom from 'react-dom';

import shape from './index.css';

import kitPic from './cat.png';
console.log(kitPic)
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src={ kitPic } style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div className={shape.mouse} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (//render prop
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
export default MouseTracker
