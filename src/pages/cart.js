import React from "react";
import {Link} from "react-router-dom";

class Cart extends React.Component {

    state = {
        loading: true,
        items: [],
        userId: this.props.match.params.userId
    };

    async componentDidMount() {
        const url = "http://localhost:5000/user/item/" + this.state.userId;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items: data, loading: false});
        // console.log(data);
    }

    render() {
        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.items.length) {
            return <div>Your cart is empty...</div>
        }
        return (
            <div>
                <h3>Cart!</h3>
                {this.state.items.map(item => (
                    <div key={item.id}>
                        <div>{"Name:   " + item.name}</div>
                        <div>{"Price:   " + item.price}</div>
                        <div>{"Description:   " + item.description}</div>
                        <div>{"Quantity:   " + item.quantityInCart}</div>
                        <div>----------------</div>
                    </div>
                ))}
                <Link to={ { pathname: "/checkout/" + this.state.userId } }>---- Checkout ----</Link>
            </div>
        );
    }
}

export default Cart;