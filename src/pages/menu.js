import React from "react";

class Menu extends React.Component {
    state = {
        loading: true,
        items: []
    };

    async componentDidMount() {
        const url = "http://localhost:5000/user";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items: data, loading: false});
        console.log(data);
    }

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
                        <div>{item.firstName}</div>
                        <div>{item.lastName}</div>
                        <div>{item.phoneNumber}</div>
                        <div>----------------</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Menu;