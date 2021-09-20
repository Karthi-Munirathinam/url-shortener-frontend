import './App.css';
import Appbar from './Components/Appbar';
import Homepage from './Components/Homepage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Forgotpage from './Components/Forgotpage';
import { useState } from 'react';
import Forgotpageresetpassword from './Components/Forgotpageresetpassword';
import Mainpage from './Components/Mainpage';

function App() {
  const [loggedin, setLoggedIn] = useState(false);
  const handleLoggedIn = () => {
    setLoggedIn(true)
  }
  return (
    <Router>
      <Appbar loggedIn={loggedin} setlogin={setLoggedIn} />
      <Switch>
        <Route path="/login" exact>
          <Login handleLog={handleLoggedIn} />
        </Route>
        <Route path="/register" exact>
          <Signup />
        </Route>
        <Route path="/forgotpassword" exact>
          <Forgotpage />
        </Route>
        <Route path="/reset-password" exact>
          <Forgotpageresetpassword />
        </Route>
        <Route path="/mainpage" exact>
          <Mainpage />
        </Route>
        <Route path="/" exact>
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
