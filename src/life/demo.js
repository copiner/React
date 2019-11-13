/*
forceUpdate
*/
//Sub.js
class Sub extends React.Component{
    construcotr(){
        super();
        this.name = "yema";
    }
    refChangeName(name){
        this.name = name;
        this.forceUpdate();
    }
    render(){
        return (<div>{this.name}</div>);
    }
}

//App.js
class App extends React.Component{

    handleClick(){
        this.subRef.refChangeName("yemafuren");
    }
    render(){
        return (<div>
            <Sub ref={(sub)=>{this.subRef = sub;}} />
            <button onClick={this.handleClick}>click</button>
        </div>);
    }
}
