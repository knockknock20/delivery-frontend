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
    }

    async componentDidMount() {
        const url = "http://localhost:5000/restaurant/item/" + this.state.restaurantId;   
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items: data, loading: false});
    }

    handleAdd (event) {
        event.preventDefault();

        const itemId = event.target.id;
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
                alert('Item can not be add to cart\n Error: ' + error.message);
            }
        );
    };

    render() {
        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.items.length) {
            return (
                <div>
                    <div>didn't get any item...</div>
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
                <h3>Menu!</h3>
                {this.state.items.map(item => (
                    <div key={item.id}>
                        <div>{"Item Name:   " + item.name}</div>
                        <div>{"Item Price:   $" + item.price}</div>
                        <div>{"Item Description:   " + item.description}</div>
                        <div>
                            <button id={item.id} onClick={this.handleAdd}> Add to Cart </button>
                        </div>
                        <div>----------------------------</div>
                    </div>
                ))}
                <div>---Total Items in Cart---</div>
                <span style={{fontSize: 30}}>{ this.state.count }</span>
                <div>-------------------------</div>
                <Link to={ { pathname: "/cart/" + this.state.userId, restaurantId: this.state.restaurantId } }>
                    <button type="button">
                        My Cart
                    </button>
                </Link>
                <br />
                <Link to={ { pathname: "/", userId: this.state.userId} } >
                    <button type="button">
                        Main Page
                    </button>
                </Link>
            </div>
            
        );
    }
}

export default Menu;