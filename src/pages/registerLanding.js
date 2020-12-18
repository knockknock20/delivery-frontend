import React from "react";
import MainPage from './main';
import RegisterForm from './register';

class RegisterLanding extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          userId: null
        }
        this.stateChanger = this.stateChanger.bind(this);
    }

    stateChanger(userId) {
        console.log("stateChanger called!!");
        this.setState({userId : userId});
    }

    render() {
        return (
            <div>
            { (this.state.userId) ? <MainPage userId={this.state.userId}/> : <RegisterForm stateChanger={this.stateChanger}/>}
            </div>
        )
    }
}

export default RegisterLanding;