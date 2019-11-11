/*
setState
在批量多次的更新中，延缓到最后合并渲染是有好处的，防抖动函数的出发点类似,
每一次setState如果都引发一次组件更新，走完一圈生命周期，实在是有点粗糙和浪费，生命周期函数为纯函数性能应当还能够接受，
可是render函数内返回的虚拟DOM去做比较这个就比较费时间

setState可以接受一个函数作为参数
*/
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "title",
      content: "content",
      foot: "foot"
    }
  }

  componentDidMount() {
    document.getElementById("h2").addEventListener("click", this.changeContent);
    this.setState({ title: "title:aaaaa" });
    console.log("state.title", this.state.title);
  }

  onClickForTitle = () => {
    this.setState({ title: "content:bbbbb" });
    console.log("state.title:", this.state.title);
  }

  changeContent = () => {
    this.setState({ content: "content:ccccc" });
    console.log("state.content", this.state.content);
  }

  onClickForFoot = () => {
    setTimeout(() => {
      this.setState({ foot: "foot: ddddd" });
      console.log("state.foot", this.state.foot);
      this.setState({ foot: "foot: eeeee" });
      console.log("state.foot", this.state.foot);
    }, 0);
  }

  render() {
    return (
      <div className="App">
        <h1 onClick={this.onClickForTitle}>{this.state.title}</h1>
        <h2 id="h2">{this.state.content}</h2>
        <h3 onClick={this.onClickForFoot}>{this.state.foot}</h3>
      </div>
    );
  }
}

export default App;
