
import React from "react";
import MainPage from './main';
import LoginForm from './login';

class Landing extends React.Component {
    constructor(props) {
        super(props)
        // the initial application state
        this.state = {
          user: null
        }
    }

    signIn(username, password) {
        // This is where you would call Firebase, an API etc...
        // calling setState will re-render the entire app (efficiently!)
        this.setState({
          user: {
            username,
            password,
          }
        })
      }

      signOut() {
        // clear out user from state
        this.setState({user: null})
      }

      render() {
        // Here we pass relevant state to our child components
        // as props. Note that functions are passed using `bind` to
        // make sure we keep our scope to App
        return (
          <div>
            { 
              (this.state.user) ? 
                <MainPage 
                 user={this.state.user} 
                 onSignOut={this.signOut.bind(this)} 
                />
              :
                <LoginForm 
                 onSignIn={this.signIn.bind(this)} 
                />
            }
          </div>
        )
      }
}

export default Landing;