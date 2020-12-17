import React from "react";
import {Link} from "react-router-dom";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../style/profile.css";
import Button from "react-bootstrap/Button";
import backendURL from "./backendURL";

class Profile extends React.Component {

    state = {
        loading: true,
        userData: null,
        userId: this.props.location.userId,
    };

    async componentDidMount() {
        // const url = "http://localhost:5000/user/" + this.state.userId;   
        const url = backendURL + "user/" + this.state.userId; 
        const response = await fetch(url);
        const data = await response.json();
        this.setState({userData: data, loading: false});
    }

    render() {
        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.userData) {
            return(
                <div>
                    <div>didn't get any profile data...</div>
                    <Link to={ { pathname: "/", userId: this.state.userId} } >
                        <button type="button">
                            Main Page
                        </button>
                    </Link>
                </div>
            );
        }

        return (
            <div>
                <Navbar fixed="top" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Knock Knock</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={ { pathname: "/", userId: this.state.userId} } >
                            Home
                        </Nav.Link>
                    </Nav>
                </Navbar>

                <div className="profile">
                    
                    <Image width="210px" height="200px" src={this.state.userData.imageURL} roundedCircle />
                   
                    <div className="profileText">
                        <div>{"First Name:   " + this.state.userData.firstName}</div>
                        <div>{"Last Name:   " + this.state.userData.lastName}</div>
                        <div>{"Gender:   " + this.state.userData.gender}</div>
                        <div>{"Phone Number:   " + this.state.userData.phoneNumber}</div>
                        <div>{"Email:   " + this.state.userData.email}</div>
                        <div>{"Address:   " + this.state.userData.address}</div>
                    </div>

                    <Link to={ { pathname: "/", userId: this.state.userId} } >
                        <Button variant="outline-secondary" block>
                            Home
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Profile;