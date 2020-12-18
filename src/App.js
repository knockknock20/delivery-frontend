import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Menu from './pages/menu';
import Landing from './pages/landing';
import RegisterLanding from './pages/registerLanding';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Order from './pages/order';
import Profile from './pages/profile';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/menu/:restaurantId" component={Menu} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/cart/:userId" component={Cart} />
        <Route exact path="/checkout/:userId" component={Checkout} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/register" component={RegisterLanding} />
      </Switch>
    </Router>
  );
}
export default App;
