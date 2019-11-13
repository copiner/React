import Component from './component'

class MyComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Tina',
            step: 1
        }
    }

    elmClick = () => {
      //React是通过事务的方式来合并多个setState操作的，本质来说还是同步的
      this.setState({name: `Jack${this.state.step}`, step: this.state.step + 1 });
      this.setState({name: `Jack${this.state.step}`, step: this.state.step + 1 });
    }

    render() {
        return(
            <div id="myComp" onClick={this.elmClick}>
                <div>This is My Component! {this.props.count}</div>
                <div>name: {this.state.name}</div>
            </div>
        )
    }
}
export default MyComp;
