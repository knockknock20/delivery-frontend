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
        <Route exact path="/menu/:restaurantId" component={Menu} />
        <Route exact path="/cart/:userId" component={Cart}></Route>
      </Switch>
    </Router>
  );
}
export default App;
