import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import MainPage from './pages';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
      </Switch>
    </Router>
  );
}
export default App;
