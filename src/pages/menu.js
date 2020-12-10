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
            body: JSON.stringify(
                {
                    itemId: itemId
                }
            )
        };

        fetch(url, requestOption)
            .then (response => response.json())
            .then(
                json => { this.setState({ count: this.state.count + 1}) }
            )
            //.then(() => {this.props.stateChanger(this.state.count)})
            .catch(error => { console.log(error.message); alert('Item can not be add to cart\n Error: ' + error.message);});
    };

    render() {
        console.log("restaurantId:" + this.state.restaurantId);
        console.log("userId:" + this.state.userId);

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
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                        <div>{item.description}</div>
                        <div>
                            <button id={item.id} onClick={this.handleAdd}> Add to Cart </button>
                        </div>
                    </div>
                ))}

                <span style={{fontSize: 30}}>{ this.state.count }</span>
                <Link to={ { pathname: "/cart/" + this.state.userId } }>---- Go To Cart ----</Link>
            </div>
            
        );
    }
}

export default Menu;