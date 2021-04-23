import React, { Component } from 'react';

//闭包
class Child extends Component {
	componentDidMount(){
		this.props.onRef && this.props.onRef(this);
	}
	func = () =>{
		console.log("yep!")
	}
	render(){
		return (<div>CHILD</div>);
	}
}

class Parents extends Component {

	handleOnClick=()=>{
		this.child.func();
	}

	render(){
		return (<div>
			<button onClick={this.handleOnClick}>click</button>

			<Child onRef={ ref => this.child = ref }></Child>
		</div>);
	}
}
export default Parents;
