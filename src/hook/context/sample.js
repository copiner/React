/*
使用 context, 我们可以避免通过中间元素传递 props
*/
import React from 'react';

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

class Sample extends React.Component {
  render() {
    return <Toolbar theme={themes.light} />;
  }
}

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemedButton theme={props.theme} text={"TOOL"} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} text={this.props.text} />;
  }
}

function Button (props){
  console.log(props)
  return (
    <button style={{ background: props.theme.background, color: props.theme.foreground }}>
      {props.text}
    </button>
  )
}

export default Sample
