import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            valid: false
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
        // this.setState({
        //     email: this.username.value,
        //     password: this.password.value
        // })
        console.log(this.state.email);
        console.log(this.state.password);
      }
    

    render() {
        return (
            <form onSubmit={this.handleSignIn.bind(this)}>
                <h3>Sign in</h3>
                <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="enter you username" />
                <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="enter password" />
                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default LoginForm;