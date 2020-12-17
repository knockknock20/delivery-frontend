import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

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
            imageURL: '',
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
                    imageURL: this.state.imageURL,
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
                        imageURL: json.imageURL,
                        address: json.address,
                        password: json.password,
                        userId: json.id
                    }
                ) }
            ).then(() => {this.props.stateChanger(this.state.userId)});
        }

        render() {
            return (
                <div>
                    <Navbar fixed="top" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Knock Knock</Navbar.Brand>
                    </Navbar>

                    <div className="loginForm">
                        <Form onSubmit={this.handleRegister.bind(this)}>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstName" value={this.state.firstName} onChange={this.handleInputChange} type="text" placeholder="First Name" />
                            </Form.Group>

                            <Form.Group controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastName" value={this.state.lastName} onChange={this.handleInputChange} type="text" placeholder="Last Name" />
                            </Form.Group>

                            <Form.Group controlId="formBasicGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control name="gender" value={this.state.gender} onChange={this.handleInputChange} type="text" placeholder="Gender" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} type="text" placeholder="Phone Number" />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" value={this.state.email} onChange={this.handleInputChange} type="email" placeholder="Email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control name="address" value={this.state.address} onChange={this.handleInputChange} type="text" placeholder="Address" />
                            </Form.Group>

                            <Form.Group controlId="formBasicImageURL">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control name="imageURL" value={this.state.imageURL} onChange={this.handleInputChange} type="text" placeholder="Image URL" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" value={this.state.password} onChange={this.handleInputChange} type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="outline-secondary" type="submit" block>
                                Register
                            </Button>
                        </Form>
                    </div>
                </div>
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