import React from "react";

class Order extends React.Component {

    state = {
        loading: true,
        orders: [],
        userId: this.props.match.params.userId
    };

    async componentDidMount() {
        const url = "http://localhost:5000/user/order/" + this.state.userId;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({orders: data, loading: false});
        console.log(data);
    }

    render() {
        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.orders.length) {
            return <div>You have no historical order...</div>
        }
        return (
            <div>
                <h3>Orders!</h3>
                {this.state.orders.map(order => (
                    <div key={order.id}>
                        {/* <div>{"Order:   " + item.name}</div>
                        <div>{"Price:   " + item.price}</div>
                        <div>{"Description:   " + item.description}</div>
                        <div>{"Quantity:   " + item.quantityInCart}</div> */}
                        <div>----------------</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Order;