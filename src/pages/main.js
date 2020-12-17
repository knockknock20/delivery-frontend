import React from "react";
import {Link} from "react-router-dom";
import "../style/card.css";
import 'purecss/build/pure.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from "react-bootstrap/Image"


class MainPage extends React.Component {

    state = {
        loading: true,
        restaurants: [],
        userId: this.props.userId
    };

    async componentDidMount() {
        const url = "http://localhost:5000/restaurant";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({restaurants: data, loading: false});
    }

    render() {
        if (this.state.loading) {
            return <div> loading... </div>;
        }

        if (!this.state.restaurants.length) {
            return <div>didn't get any restaurants...</div>
        }
        
        console.log(this.state.restaurants);
        return (
            <div className="mainPage">
                <Navbar fixed="top" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Knock Knock</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={ {pathname: "/profile", userId: this.state.userId} }>
                            Profile
                        </Nav.Link>
                        <Nav.Link as={Link} to={ {pathname: "/order", userId: this.state.userId} }>
                            Orders
                        </Nav.Link>
                    </Nav>
                </Navbar>

                <div className="restaurants">
                    {this.state.restaurants.map(restaurant => (
                        <div class="card" key={restaurant.id}>
                            <div class="card-horizontal">
                                <div class="img-square-wrapper">
                                    <Image className="images" width="330px" height="250px" src={restaurant.logoURL} alt="Card image cap" rounded/>
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">{restaurant.name}</h4>
                                    <p class="card-text">{restaurant.address}</p>
                                    <p class="card-text">{restaurant.description}</p>
                                    <Link to={ { pathname: "/menu/" + restaurant.id, userId: this.state.userId } }>
                                        <Button variant="outline-secondary">Menu</Button>
                                    </Link>
                                </div>
                            </div>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default MainPage;