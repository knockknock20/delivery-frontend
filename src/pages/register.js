import React from "react";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            firstName: '',
            lastName: '',
            gender: '',
            phoneNumber: '',
            email: '',
            address: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleRegister(e) {
        e.preventDefault()
       
        const requestOption = {
            method: "POST",
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {   
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    gender: this.state.gender,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    address: this.state.address,
                    password: this.state.password
                }
            )
        };

        fetch("http://localhost:5000/register", requestOption)
            .then(response => response.json())
            .then(
                json => { this.setState(
                    {   
                        firstName: json.firstName,
                        lastName: json.lastName,
                        gender: json.gender,
                        phoneNumber: json.phoneNumber,
                        email: json.email,
                        address: json.address,
                        password: json.password,
                        userId: json.id
                    }
                ) }
            ).then(() => {this.props.stateChanger(this.state.userId)});
        }

        render() {
            return (
                <form onSubmit={this.handleRegister.bind(this)}>
                    <h3>Welcome to the registration page :)</h3>
                    <h3>It seems that you have not registered yet, please register first :)</h3>
                    <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} placeholder="First Name" />
                    <br/><input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} placeholder="Last Name" />
                    <br/><input type="text" name="gender" value={this.state.gender} onChange={this.handleInputChange} placeholder="Gender" />
                    <br/><input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} placeholder="Phone Number" />
                    <br/><input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email" />
                    <br/><input type="text" name="address" value={this.state.address} onChange={this.handleInputChange} placeholder="Address" />
                    <br/><input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Password" />
                    <br/><input type="submit" value="Register" />
                </form>
            );
        }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
}

export default RegisterForm;