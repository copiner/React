/*
setState
在批量多次的更新中，延缓到最后合并渲染是有好处的，防抖动函数的出发点类似,
每一次setState如果都引发一次组件更新，走完一圈生命周期，实在是有点粗糙和浪费，生命周期函数为纯函数性能应当还能够接受，
可是render函数内返回的虚拟DOM去做比较这个就比较费时间

setState可以接受一个函数作为参数

在React中，如果是由React引发的事件处理（比如通过onClick引发的合成事件处理）和组件生命周期函数内（比如componentDidMount），
调用this.setState不会同步更新this.state，除此之外的setState调用会同步执行this.state。
所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。
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
    console.log("state.title", this.state.title);//没有同步更新
  }

  onClickForTitle = () => {
    this.setState({ title: "content:bbbbb" });//没有同步更新
    console.log("state.title:", this.state.title);
  }

  onClickForTitleFun = () => {
    this.setState((prevState)=>{
      return {
        title: "content:bbbbb"
      }
    },()=>{
      console.log('fun: '+this.state.title)
    });
    console.log("state.title:", this.state.title);
  }

  onClickForTitleCallback = () => {
    this.setState({ title: "content:bbbbb" },() => {
      console.log('callback: '+this.state.title)
    });

    console.log("state.title:", this.state.title);
  }

  onClickForTitleAsy = async ()=>{
  //async onClickForTitleAsy(){ //this!!!
    await this.setState({ title: "content:bbbbb" });
    console.log("state.title:", this.state.title);
  }

  changeContent = () => {
    this.setState({ content: "content:ccccc" });//同步更新
    console.log("state.content", this.state.content);
  }

  onClickForFoot = () => {
    setTimeout(() => {
      this.setState({ foot: "foot: ddddd" });//同步更新
      console.log("state.foot", this.state.foot);
      this.setState({ foot: "foot: eeeee" });//同步更新
      console.log("state.foot", this.state.foot);
    }, 0);
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <h1 onClick={this.onClickForTitle}>{this.state.title}</h1>
        <h1 onClick={this.onClickForTitleCallback}>callback:{this.state.title}</h1>
        <h1 onClick={this.onClickForTitleFun}>function:{this.state.title}</h1>
        <h1 onClick={this.onClickForTitleAsy}>async:{this.state.title}</h1>
        <h2 id="h2">{this.state.content}</h2>
        <h3 onClick={this.onClickForFoot}>{this.state.foot}</h3>
      </div>
    );
  }
}

export default App;
