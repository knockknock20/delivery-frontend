import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import MainPage from './pages/main';
import Menu from './pages/menu';
import LoginForm from './pages/login';
import Landing from './pages/landing';
import Cart from './pages/cart';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        {/* <Route exact path="/" component={LoginForm} /> */}
        {/* <Route path="/main" component={MainPage} /> */}
        <Route exact path="/menu/:restaurantId" component={Menu} />
        {/* <Redirect to='/404page' /> */}
        <Route exact path="/cart/:userId" component={Cart}></Route>
      </Switch>
    </Router>
  );
}
export default App;
