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
        this.helper = this.helper.bind(this);
    }

    async helper() {
        const url = "http://localhost:5000/restaurant/item/" + this.state.restaurantId;   
        const response = await fetch(url);
        const data = await response.json();

        await data.map(async (item) => {
            const url = "http://localhost:5000/user/item/quantity/" + this.state.userId + "/" + item.id;
            const result = await (await fetch(url)).text();
            item.quantity = result === "null" ? "0" : result;
        })

        this.setState({items: data, loading: false});
    }

    async componentDidMount() {
        this.helper();
    }

    async handleAdd (event) {
        event.preventDefault();

        const itemId = event.target.id;
        const url = "http://localhost:5000/user/item/" + this.state.userId;

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
        const url = "http://localhost:5000/user/item/" + this.state.userId;

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

    // {
    //     method: "GET",
    //     headers: { 'Content-Type': 'text/html' },
    // }

    // currentItemQuantity (itemId) {
    //     const url = "http://localhost:5000/user/item/quantity/" + this.state.userId + "/" + itemId;
    //     return fetch(url)
    //     .then(response => response.text())
    //     .then(response => {return response})
    //     .catch(error => console.warn(error));
    // }

    

    // async currentItemQuantity (itemId) {
    //     const url = "http://localhost:5000/user/item/quantity/" + this.state.userId + "/" + itemId;
    //     return await fetch(url);
    // }

    // totalItemInCart () {
    //     const url = "http://localhost:5000/user/item/total/" + this.state.userId;
    //     return fetch(url, {
    //         method: "GET",
    //         headers: { 'Content-Type': 'text/html' },
    //     })
    //     .then( (response) => {
    //         console.log("totalItemInCart:" + response);
    //         return response;
    //      })
    //      .catch(error => console.warn(error));
    // }


    render() {
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
                        <div>{"Current Quantity in Cart:   " + item.quantity}</div>
                        
                        <div>
                            <button id={item.id} onClick={this.handleAdd}> Add to Cart </button>
                            <button id={item.id} onClick={this.handleRemove}> Remove from Cart </button>
                        </div>
                        <div>----------------------------</div>
                    </div>
                ))}
                <div>---Total Items in Cart---</div>
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