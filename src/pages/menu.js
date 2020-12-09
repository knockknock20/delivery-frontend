import React from "react";
import {Link} from "react-router-dom";

class Menu extends React.Component {

    state = {
        loading: true,
        items: [],
        restaurantId: this.props.match.params.restaurantId,
        userId: this.props.location.userId
    };

    async componentDidMount() {
        const url = "http://localhost:5000/restaurant/item/" + this.state.restaurantId;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items: data, loading: false});
        console.log(data);
    }

    render() {
        console.log(this.state.restaurantId);
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
                        <div>----------------</div>
                    </div>
                ))}

                <Link to={ { pathname: "/cart/" + this.state.userId } }>---- Go To Cart ----</Link>
            </div>
            
        );
    }
}

export default Menu;