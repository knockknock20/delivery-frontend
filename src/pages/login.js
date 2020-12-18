import React from "react";
import {Link, Redirect} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "../style/login.css";
import backendURL from "./backendURL";

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
       
        // fetch("http://localhost:5000/user/login", requestOption)
        fetch(backendURL + "user/login", requestOption)
            .then(response => response.json())
            .then(
                json => { 
                    if (json == null) {
                        this.setState(() => ({ toRegister: true }))
                    } else {
                        this.setState(
                            {   
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
                    <Navbar fixed="top" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Knock Knock</Navbar.Brand>
                    </Navbar>
                    
                    <div className="loginForm">
                        <Form onSubmit={this.handleSignIn.bind(this)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" value={this.state.email} onChange={this.handleInputChange} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" value={this.state.password} onChange={this.handleInputChange} type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="outline-secondary" type="submit" block>
                                Login
                            </Button>
                            <br />
                            <Form.Text className="text-muted">
                                New to Knock Knock?
                            </Form.Text>
                            <Link to={ { pathname: "/register"} } >
                                Register
                            </Link>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}

export default LoginForm;