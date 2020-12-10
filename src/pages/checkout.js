import React from "react";
import {Link} from "react-router-dom";

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
        console.log("url:" + url);
        const response = await fetch(url, requestOption);
        const data = await response.json();
        this.setState({checkout: data, loading: false});
        console.log(data);
    }

    render() {
        if (this.state.loading) {
            return <div> generating order... </div>;
        }
        if (!this.state.checkout) {
            return <div>You have no historical order...</div>
        }
        return (
            <div>
                <h3>Checkout!</h3>
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
                        <div key={orderItem.id}>
                            <div>*********** Item **************</div>
                            <div>{"Name:   " + orderItem.name}</div>
                            <div>{"Price:   " + orderItem.price}</div>
                            <div>{"Description:   " + orderItem.description}</div>
                            <div>*******************************</div>
                            <br />
                        </div>
                    ))
                }

                <div>{ "Total Price: " + this.state.checkout.totalPrice}</div>
                <div>{ "Order Status: " + this.state.checkout.orderStatus}</div>

                <Link to={ { pathname: "/", userId: this.state.userId} } >---- Go To Main Page ----</Link>
            </div>
        );
    }
}

export default Checkout;