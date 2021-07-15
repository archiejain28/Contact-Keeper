import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Alerts from "./components/layout/Alerts";
import ContactState from "./context/contact/Contactstate";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import setAuthToken from "./setAuthtoken";
import Privateroute from "./components/routing/privateroute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts />
              <Switch>
                <Privateroute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
