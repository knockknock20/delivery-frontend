import React from "react";
import MainPage from './main';
import LoginForm from './login';

class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.location.userId
        }

        this.stateChanger = this.stateChanger.bind(this);
    }

    stateChanger(userId) {
        this.setState({userId : userId});
    }

    signOut() {
        this.setState({user: null})
    }

    render() {
        return (
            <div>
                { (this.state.userId) ? <MainPage userId={this.state.userId}/> : <LoginForm stateChanger={this.stateChanger}/> }
            </div>
        )
    }
}

export default Landing;