import React from "react";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../style/checkout.css";
import Image from "react-bootstrap/Image";

class Checkout extends React.Component {

    state = {
        loading: true,
        checkout: null,
        userId: this.props.match.params.userId
    };

    async componentDidMount() {
        const requestOption = {
            method: "POST",
            header: {'Content-Type':'application/json'},
        };
        const url = "http://localhost:5000/user/order/" + this.state.userId;
        const response = await fetch(url, requestOption);
        const data = await response.json();
        this.setState({checkout: data, loading: false});
    }

    render() {
        if (this.state.loading) {
            return <div> generating order... </div>;
        }
        if (!this.state.checkout) {
            return (
                <div>
                    <div>You have no historical order...</div>
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
                    <Navbar.Brand href="#home">Knock Knock - Checkout!</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={ { pathname: "/", userId: this.state.userId} } >
                            Home
                        </Nav.Link>
                    </Nav>
                </Navbar>
                
                <div className="checkoutPage">
                    <div>{ "Date: " 
                        + this.state.checkout.orderDate.year 
                        + "-" 
                        + this.state.checkout.orderDate.monthValue 
                        + "-" 
                        + this.state.checkout.orderDate.dayOfMonth  }
                    </div>

                    <div>{ "Time: " 
                        + this.state.checkout.orderTime.hour
                        + ":" 
                        + this.state.checkout.orderTime.minute
                        + ":" 
                        + this.state.checkout.orderTime.second }
                    </div>
                    <br />
                    
                    {this.state.checkout.orderItems.map(orderItem => (
                        <div class="card" key={orderItem.id}> 
                            <div class="card-horizontal">
                                <div class="img-square-wrapper">
                                    <Image className="images" src={orderItem.imageURL} width="200px" height="200px" alt="Card image cap" />
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">{orderItem.name}</h4>
                                    <p class="card-text">Price:   ${orderItem.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <br />

                    <div>{ "Total Price:  $" + this.state.checkout.totalPrice}</div>
                    <div>{ "Order Status: " + this.state.checkout.orderStatus}</div>

                    <br />

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

export default Checkout;