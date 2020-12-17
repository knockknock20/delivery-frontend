import React from "react";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../style/image.css";

class Order extends React.Component {

    state = {
        loading: true,
        orders: [],
        userId: this.props.location.userId
    };

    async componentDidMount() {
        const url = "http://localhost:5000/user/order/" + this.state.userId;   
        const response = await fetch(url);
        const data = await response.json();
        this.setState({orders: data, loading: false});
    }

    render() {
        console.log(this.state.orders);
        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.orders.length) {
            return (
                <div>
                    <Navbar fixed="top" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Knock Knock - History Orders</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to={ { pathname: "/", userId: this.state.userId} } >
                                Home
                            </Nav.Link>
                        </Nav>
                    </Navbar>

                    <div className="emptyCart">
                        <p>Didn't get any history orders...</p>
                        <br />
                        <Link to={ { pathname: "/", userId: this.state.userId} } >
                            <Button variant="outline-secondary" block>
                                Main Page
                            </Button>
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="orders">
                <Navbar fixed="top" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Knock Knock - History Orders</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={ { pathname: "/", userId: this.state.userId} } >
                            Home
                        </Nav.Link>
                    </Nav>
                </Navbar>

                <Accordion className="orderAccordions" defaultActiveKey="0">
                    {this.state.orders.map(order => (
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={order.id}>
                                <div>{"Order Time:  " +
                                    order.orderDate.year + "-" + order.orderDate.monthValue + "-" + order.orderDate.dayOfMonth 
                                    + "  " 
                                    + order.orderTime.hour + ":" + order.orderTime.minute + ":" + order.orderTime.second}
                                </div>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={order.id}>
                                <Card.Body>
                                    <div>
                                        {order.orderItems.map(orderItem => (
                                            <div class="card" key={orderItem.id}> 
                                                <div class="card-horizontal">
                                                    <div class="img-square-wrapper" className="images">
                                                        <Image className="images" src={orderItem.imageURL} width="200px" height="200px" alt="Card image cap" />
                                                    </div>
                                                    <div class="card-body">
                                                        <h4 class="card-title">{orderItem.name}</h4>
                                                        <div class="card-text">{"Item Price:   $" + orderItem.price}</div>
                                                        <div class="card-text">{"Item Description:   " + orderItem.description}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div class="card-text">{"Total Price:   $" + order.totalPrice}</div>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
            </div>   
        );
    }
}

export default Order;