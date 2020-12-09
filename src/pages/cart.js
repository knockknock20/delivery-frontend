import React from "react";

class Cart extends React.Component {

    state = {
        loading: true,
        items: [],
        userId: this.props.location.userId
    };

    async componentDidMount() {
        const url = "http://localhost:5000/user/item/" + this.state.userId;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items: data, loading: false});
        console.log(data);
    }

    render() {
        console.log(this.state.restaurantId);

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
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                        <div>{item.description}</div>
                        <div>{item.quantityInCart}</div>
                        <div>----------------</div>
                    </div>
                ))}
            </div>
        );
    }
       

    
}

export default Cart;