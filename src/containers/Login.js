/* require("dotenv").config(); */

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Login = ({ inLogin }) => {
  // on récupère les valeurs des input email et password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + `/user/log_in`,
        {
          email: email,
          password: password,
        }
      );
      Cookies.set("token", response.data.token, { expires: 7 });
      inLogin(response.data.token);
      //history.push("/offers");
    } else {
      setErrorInput("Merci de remplir l'email et le password");
    }
  };

  return (
    <main id="mainLogin">
      <div id="login">
        <div className="padding-20">
          <h2>Connexion</h2>
          <hr></hr>
          <form className="loginForm" onSubmit={handleLoginSubmit}>
            <label htmlFor="email" className={errorInput && "errorLabel"}>
              Adresse mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={errorInput && "errorInput"}
            />
            <label htmlFor="password" className={errorInput && "errorLabel"}>
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={errorInput && "errorInput"}
            />
            {errorInput && <p className="error">{errorInput}</p>}
            <input type="submit" value="Se connecter" />
          </form>
        </div>
        <hr></hr>
        <div className="padding-20 loginCreate">
          <p>Vous n'avez pas de compte ?</p>
          <Link to="/sign_up">
            <button>Créer un compte</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
