import React from "react";
import RegisterForm from './register';
import {Link, Redirect} from "react-router-dom";

class LoginForm extends React.Component {
    state = { toRegister: false }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userId: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSignIn(e) {
        e.preventDefault()
       
        const requestOption = {
            method: "POST",
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { 
                    email: this.state.email,
                    password: this.state.password
                }
            )
        };

        fetch("http://localhost:5000/user/login", requestOption)
            .then(response => response.json())
            .then(
                json => { 
                    if (json == null) {
                        this.setState(() => ({ toRegister: true }))
                    } else {
                        this.setState(
                            {   
                                // what if the returned json is null -> how to direct to register page?
                                email: json.email,
                                password: json.password,
                                userId: json.id
                            }
                    ) }
                }
            ).then(() => {this.props.stateChanger(this.state.userId)});
    }

    render() {
        if (this.state.toRegister) {
            return <Redirect to='/register' />
        } else {
            return (
                <div>
                <form onSubmit={this.handleSignIn.bind(this)}>
                    <h3>Sign in</h3>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="enter you username" />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="enter password" />
                    <input type="submit" value="Login" />
                </form>

                <div>
                {/* <h4>Do not have an account yet? </h4> */}
                <Link to={ { pathname: "/register"} } >
                    <button type="button">
                        Register
                    </button>
                </Link>
                </div>
                </div>
            );
        }
    }
}

export default LoginForm;