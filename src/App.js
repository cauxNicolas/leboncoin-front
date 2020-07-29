import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Payement from "./containers/Payement";
import Cookies from "js-cookie";

function App() {
  // pour gerer la connexion et deconnexion
  const tokenFromCookie = Cookies.get("token");

  let newState;
  if (tokenFromCookie) {
    newState = { token: tokenFromCookie };
  } else {
    newState = null;
  }
  const [user, setUser] = useState(newState);

  const inLogin = (valueToken) => {
    setUser(valueToken);
  };

  const outLogin = (alexis) => {
    Cookies.remove("token");
    setUser(null);
    alexis.push("/");
  };

  return (
    <div>
      <Router>
        <Header user={user} outLogin={outLogin} />
        <Switch>
          <Route path="/offers">
            <Offers />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login inLogin={inLogin} />
          </Route>
          <Route path="/publish">
            <Publish />
          </Route>
          <Route path="/payment">
            <Payement />
          </Route>
          <Route>
            <Home path="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
