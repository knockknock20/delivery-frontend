import React from "react";

class LoginForm extends React.Component {
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
                json => { this.setState(
                    {   
                        email: json.email,
                        password: json.password,
                        userId: json.id
                    }
                ) }
            ).then(() => {this.props.stateChanger(this.state.userId)});
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