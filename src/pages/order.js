import React from "react";
import {Link} from "react-router-dom";

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
        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.orders.length) {
            return (
                <div>
                    <div>didn't get any historical orders...</div>
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
                <h3>Historical Orders!</h3>
                {this.state.orders.map(order => (
                    <div key={order.id}>
                        <div>{"Order Timestamp:   " 
                        + order.orderDate.year + "-" + order.orderDate.monthValue + "-" + order.orderDate.dayOfMonth 
                        + "  " 
                        + order.orderTime.hour + ":" + order.orderTime.minute + ":" + order.orderTime.second}</div>
                        {order.orderItems.map(orderItem => (
                            <div key={orderItem.id}>
                                <div> **** Item **** </div>
                                <div>{"Item Name:   " + orderItem.name}</div>
                                <div>{"Item Price:   $" + orderItem.price}</div>
                                <div>{"Item Description:   " + orderItem.description}</div>
                                <br />
                            </div>
                        ))}
                        <div>----------------------------</div>
                    </div>
                ))}
                <Link to={ { pathname: "/", userId: this.state.userId} } >
                    <button type="button">
                        Main Page
                    </button>
                </Link>
            </div>
            
        );
    }
}

export default Order;