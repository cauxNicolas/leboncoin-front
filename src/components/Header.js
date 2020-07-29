import React from "react";
import logo from "../img/leboncoin-seeklogo.com.svg";
import { Link, useHistory } from "react-router-dom";

const Header = ({ user, outLogin }) => {
  const history = useHistory();

  return (
    <header>
      <div className="content">
        <div className="contentHeader">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="logo leboncoin" />
            </div>
          </Link>
          <Link to="/publish">
            <div className="headerButton">
              <button>
                <i className="far fa-plus-square"></i>Déposer une annonce
              </button>
            </div>
          </Link>
          <Link to="/offers">
            <div className="headerSearch">
              <i className="fas fa-search"></i>
              <p>Rechercher</p>
            </div>
          </Link>
        </div>
        {user === null ? (
          <Link to="/login">
            <div className="login">
              <i className="far fa-user"></i>
              <div>Se connecter</div>
            </div>
          </Link>
        ) : (
          <button
            onClick={() => {
              outLogin(history);
            }}
            className="deconnexion"
          >
            <div>
              <i className="far fa-user"></i>
              <div>Se déconnecter ?</div>
            </div>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
