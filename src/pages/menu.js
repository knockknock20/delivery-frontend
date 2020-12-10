import React from "react";
import {Link} from "react-router-dom";

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
    }

    async componentDidMount() {
        const url = "http://localhost:5000/restaurant/item/" + this.state.restaurantId;   
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items: data, loading: false});
        console.log(data);
    }

    handleAdd (event) {
        event.preventDefault();

        const itemId = event.target.id;
        console.log("itemID:" + itemId);
        console.log("userId:" + this.state.userId);
        const url = "http://localhost:5000/user/item/" + this.state.userId;

        const requestOption = {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: itemId
        };

        fetch(url, requestOption)
            .then(() => { this.setState({ count: this.state.count + 1 })})
            .catch(error => { 
                console.log(error.message); 
                alert('Item can not be added to the cart\n Error: ' + error.message);
            });
    };

    handleRemove (event) {
        event.preventDefault();

        const itemId = event.target.id;
        console.log("itemID:" + itemId);
        console.log("userId:" + this.state.userId);
        const url = "http://localhost:5000/user/item/" + this.state.userId;

        const requestOption = {
            method: 'DELETE',
            header: { 'Content-Type': 'application/json' },
            body: itemId
        };

        fetch(url, requestOption)
            .then(() => { this.setState({ count: this.state.count > 0 ? this.state.count - 1 : 0  })})
            .catch(error => { 
                console.log(error.message); 
                alert('Item can not be removed to the cart\n Error: ' + error.message);
            });
    };

    // currentItemQuantity (itemId) {
    //     const url = "http://localhost:5000/user/item/quantity/" + this.state.userId + "/" + itemId;
    //     return fetch(url, {
    //         method: "GET",
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //     .then( (response) => {
    //         console.log("currentItemQuantity:" + response);
    //         return response.text();
    //      })
    //      .catch(error => console.warn(error));
    // }
        
 

    // totalItemInCart () {
    //     const url = "http://localhost:5000/user/item/quantity/" + this.state.userId;
    //     return fetch(url, {
    //         method: "GET",
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //     .then( (response) => {
    //         console.log("totalItemInCart:" + response);
    //         return response.text();
    //      })
    //      .catch(error => console.warn(error));
    // }

    render() {
        console.log("restaurantId:" + this.state.restaurantId);
        console.log("----->userId:" + this.state.userId);

        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.items.length) {
            return <div>didn't get any item...</div>
        }
        return (
            <div>
                <h3>Menu!</h3>
                {this.state.items.map(item => (
                    <div key={item.id}>
                        <div>{"Item Name:   " + item.name}</div>
                        <div>{"Item Price:   $" + item.price}</div>
                        <div>{"Item Description:   " + item.description}</div>
                        <div>
                            <span>{this.currentItemQuantity(item.id).then()}</span>
                            <button id={item.id} onClick={this.handleAdd}> Add to Cart </button>
                            <button id={item.id} onClick={this.handleRemove}> Remove from Cart </button>
                        </div>
                        <div>----------------------------</div>
                    </div>
                ))}
                <div>---Total Items in Cart---</div>
                <span>{this.totalItemInCart().then()}</span>
                <div>----Following is temperate count----------</div>
                <div>-------------------------</div>
                <Link to={ { pathname: "/cart/" + this.state.userId, restaurantId: this.state.restaurantId } }>---- Go To Cart ----</Link>
                <br />
                <Link to={ { pathname: "/", userId: this.state.userId} } >---- Go To Main Page ----</Link>
            </div>
            
        );
    }
}

export default Menu;