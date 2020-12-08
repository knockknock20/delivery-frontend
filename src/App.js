import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import MainPage from './pages/main';
import Menu from './pages/menu';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/menu/:restaurantId" component={Menu} />
        {/* <Redirect to='/404page' /> */}
      </Switch>
    </Router>
  );
}
export default App;
