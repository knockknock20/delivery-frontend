import React from "react";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../style/card.css";
import Image from "react-bootstrap/Image";
import "../style/image.css";

class Cart extends React.Component {

    state = {
        loading: true,
        items: [],
        userId: this.props.match.params.userId,
        restaurantId: this.props.location.restaurantId
    };

    async componentDidMount() {
        const url = "http://localhost:5000/user/item/" + this.state.userId;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items: data, loading: false});
    }

    render() {
        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.items.length) {
            return (
                <div>
                    <Navbar fixed="top" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Knock Knock - Cart</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to={ { pathname: "/", userId: this.state.userId} } >
                                Home
                            </Nav.Link>
                        </Nav>
                    </Navbar>


                    <div className="emptyCart">
                        <p>Your cart is empty...</p>
                        <br />
                        <Link to={ { pathname: "/", userId: this.state.userId} } >
                            <Button variant="outline-secondary" block>
                                Main Page
                            </Button>
                        </Link>
                        <br />
                        <Link to={ {pathname: "/menu/" + this.state.restaurantId, userId: this.state.userId} }>
                            <Button variant="outline-secondary" block>
                                Back To Menu
                            </Button>
                        </Link>   
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Navbar fixed="top" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Knock Knock - Cart</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={ { pathname: "/", userId: this.state.userId} } >
                            Home
                        </Nav.Link>
                    </Nav>
                </Navbar>


                <div className="cartItems">
                    {this.state.items.map(item => (
                        <div class="card" key={item.id}> 
                            <div class="card-horizontal">
                                <div class="img-square-wrapper" className="images">
                                    <Image className="images" src={item.imageURL} width="250px" height="240px" alt="Card image cap" />
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">{item.name}</h4>
                                    <p class="card-text">Price:   ${item.price}</p>
                                    <p class="card-text">Quantity:   {item.quantityInCart}</p>
                                </div>
                            </div>
                            <br />
                        </div>
                    ))}
                    <div className="cartButtonGroup">
                        <Link to={ {pathname: "/menu/" + this.state.restaurantId, userId: this.state.userId} }>
                            <Button variant="outline-secondary" block>
                                Back To Menu
                            </Button>
                        </Link>
                        <br />
                        <Link to={ { pathname: "/checkout/" + this.state.userId } } >
                            <Button variant="outline-secondary" block>
                                Checkout
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;