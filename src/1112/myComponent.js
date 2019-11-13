import Component from './component'

class MyComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Tina'
        }
    }

    render() {
        return(
            <div>
                <div>This is My Component! {this.props.count}</div>
                <div>name: {this.state.name}</div>
            </div>
        )
    }
}
export default MyComp;
