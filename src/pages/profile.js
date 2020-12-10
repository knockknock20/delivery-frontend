import React from "react";
import {Link} from "react-router-dom";

class Profile extends React.Component {

    state = {
        loading: true,
        userData: null,
        userId: this.props.location.userId,
    };

    async componentDidMount() {
        const url = "http://localhost:5000/user/" + this.state.userId;   
        const response = await fetch(url);
        const data = await response.json();
        this.setState({userData: data, loading: false});
    }

    render() {
        if (this.state.loading) {
            return <div> loading... </div>;
        }
        if (!this.state.userData) {
            return(
                <div>
                    <div>didn't get any profile data...</div>
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
                <h3>Your Profile!</h3>
                <div>--------------------------------------------</div>
                <div>{"First Name:   " + this.state.userData.firstName}</div>
                <div>{"Last Name:   " + this.state.userData.lastName}</div>
                <div>{"Gender:   " + this.state.userData.gender}</div>
                <div>{"Phone Number:   " + this.state.userData.phoneNumber}</div>
                <div>{"Email:   " + this.state.userData.email}</div>
                <div>{"Address:   " + this.state.userData.address}</div>
                <div>--------------------------------------------</div>
                <Link to={ { pathname: "/", userId: this.state.userId} } >
                    <button type="button">
                        Main Page
                    </button>
                </Link>
            </div>
        );
    }
}

export default Profile;