import React from "react";
import {Link} from "react-router-dom";

class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        loading: true,
        restaurants: [],
        userId: this.props.userId
    };

    async componentDidMount() {
        const url = "http://localhost:5000/restaurant";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({restaurants: data, loading: false});
    }

    render() {
        if (this.state.loading) {
            return <div> loading... </div>;
        }

        if (!this.state.restaurants.length) {
            return <div>didn't get any restaurants...</div>
        }

        return (
            <div>
                <h3>Welcome to Knock-Knock Delivery!!!</h3>
                <h4>Restaurants List: </h4>
                {this.state.restaurants.map(restaurant => (
                    <div key={restaurant.id}>
                        <div>{"Restaurant Name:   " + restaurant.name}</div>
                        <div>{"Restaurant Address:   " + restaurant.address}</div>
                        <div>{"Restaurant Phone Number:   " + restaurant.phoneNumber}</div>
                        <Link to={ { pathname: "/menu/" + restaurant.id, userId: this.state.userId } }>- show me the menu -</Link>
                        <div>----------------</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default MainPage;