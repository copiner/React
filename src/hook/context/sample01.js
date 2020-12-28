/*
使用 context, 我们可以避免通过中间元素传递 props

Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据
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

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
//为当前的 theme 创建一个 context, 默认值 themes.dark
const ThemeContext = React.createContext(themes.dark);

class Sample01 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: themes.light,
    };
  }

  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将light作为当前的值传递下去。
    return (
      <>
        <ThemedButton text={"ThemedButton"} />
        <ThemeContext.Provider value={this.state.value}>
          <Toolbar />
        </ThemeContext.Provider>
      </>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton text={"Toolbar"}/>
    </div>
  );
}


class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。

  //在这个例子中，当前的 theme 值为light。
  //使用 static 这个类属性来初始化你的 contextType
  static contextType = ThemeContext; //this.context
  render() {
    return <Button theme={this.context} text={this.props.text}/>;
  }
}
//ThemedButton.contextType = ThemeContext;

function Button (props){
  console.log(props)
  return (
    <button style={{ background: props.theme.background, color: props.theme.foreground }}>
      {props.text}
    </button>
  )
}


export default Sample01
