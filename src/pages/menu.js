import React from "react";
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import "../style/card.css";
import "../style/image.css";
import "../style/loadingPage.css";
import backendURL from "./backendURL";
import "../style/loadingPage.css";
import Spinner from "react-bootstrap/Spinner";

class Menu extends React.Component {

    state = {
        loading: true,
        items: [],
        restaurantId: this.props.match.params.restaurantId,
        userId: this.props.location.userId,
        count: 0
    };

    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.helper = this.helper.bind(this);
    }

    async helper() {
        // const url = "http://localhost:5000/restaurant/item/" + this.state.restaurantId; 
        const url = backendURL + "restaurant/item/" + this.state.restaurantId;   
        const response = await fetch(url);
        const data = await response.json();

        await Promise.all(data.map(async (item) => {
            // const url = "http://localhost:5000/user/item/quantity/" + this.state.userId + "/" + item.id;
            const url = backendURL + "user/item/quantity/" + this.state.userId + "/" + item.id;
            const result = await (await fetch(url)).text();
            item.quantity = result === "null" ? "0" : result;
        }));

        console.log(data);
        this.setState({items: data, loading: false});
    }

    async componentDidMount() {
        await this.helper();
    }

    async handleAdd (event) {
        event.preventDefault();

        const itemId = event.target.id;
        // const url = "http://localhost:5000/user/item/" + this.state.userId;
        const url = backendURL + "user/item/" + this.state.userId;

        const requestOption = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: itemId
        };

        await fetch(url, requestOption)
            .catch(error => { 
                console.log(error.message); 
                alert('Item can not be added to the cart\n Error: ' + error.message);
            });
        
        await this.helper();
    };

    async handleRemove (event) {
        event.preventDefault();
        
        const itemId = event.target.id;
        // const url = "http://localhost:5000/user/item/" + this.state.userId;
        const url = backendURL + "user/item/" + this.state.userId;

        const requestOption = {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' },
            body: itemId
        };

        await fetch(url, requestOption)
            .catch(error => { 
                console.log(error.message); 
                alert('Item can not be removed to the cart\n Error: ' + error.message);
            });
        
        await this.helper();
    };

    render() {
        if (this.state.loading) {
            return (
                <div className="loading">
                    <div>Loading...</div>
                     <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        if (!this.state.items.length) {
            return <div>didn't get any item...</div>
        }
        
        return (
            <div>
                <Navbar fixed="top" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Knock Knock - Menu</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={ { pathname: "/", userId: this.state.userId} } >
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to={ { pathname: "/cart/" + this.state.userId, restaurantId: this.state.restaurantId } }>
                            Cart
                        </Nav.Link>
                    </Nav>
                </Navbar>
                
                <div className="items">
                    {this.state.items.map(item => (
                        <div className="menuItemCard">
                            <div class="card" key={item.id}>
                                <div class="card-horizontal">
                                    <div class="img-square-wrapper" className="images">
                                        <Image  src={item.imageURL} width="250px" height="240px" alt="Card image cap" rounded/>
                                    </div>
                                    <div class="card-body">
                                        <h4 class="card-title">{item.name}</h4>
                                        <p class="card-text">{"Price:   $" + item.price}</p>
                                        <p class="card-text">{item.description}</p>
                                        <p class="card-text">{"Current Quantity in Cart:   " + item.quantity}</p>
                                        <div>
                                            <Button className="addRemoveButton" id={item.id} variant="outline-secondary" onClick={this.handleRemove}>  -  </Button>
                                            <Button className="addRemoveButton" id={item.id} variant="outline-secondary" onClick={this.handleAdd}>  +  </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="cartButtonGroup">
                        <Link to={ { pathname: "/cart/" + this.state.userId, restaurantId: this.state.restaurantId } }>
                            <Button variant="outline-secondary" block>
                                Cart
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Menu;