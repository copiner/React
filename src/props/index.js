/*
Render Props
*/
import React from 'react';
import ReactDom from 'react-dom';

import shape from './index.css';

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    //this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div className={shape.mouse} onMouseMove={this.handleMouseMove}>
        <h1>移动鼠标!</h1>
        <p>当前的鼠标位置是 ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

export default MouseTracker
