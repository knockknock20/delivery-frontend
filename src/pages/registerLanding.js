import React from "react";
import MainPage from './main';
import RegisterForm from './register';

class RegisterLanding extends React.Component {
    constructor(props) {
        super(props)
        // the initial application state
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
    // Here we pass relevant state to our child components
    // as props. Note that functions are passed using `bind` to
    // make sure we keep our scope to App
        return (
            <div>
            { 
                (this.state.userId) ? <MainPage userId={this.state.userId}/> : <RegisterForm stateChanger={this.stateChanger}/>
            }
            </div>
        )
    }
}

export default RegisterLanding;