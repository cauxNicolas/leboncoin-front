import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorChecked, setErrorChecked] = useState("");

  const handlePseudoChange = (event) => {
    setPseudo(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorPassword("les mots de passe ne sont pas identiques");
    } else {
      if (checked !== true) {
        setErrorChecked(" ");
      } else {
        await axios.post(process.env.REACT_APP_API_URL + `/user/sign_up`, {
          username: pseudo,
          email: email,
          password: password,
        });
        history.push("/login");
      }
    }
  };

  return (
    <main>
      <div className="signupMain">
        <div className="signupContent">
          <div className="signupLeft">
            <h2>Pourquoi créer un compte ?</h2>
            <div className="signupLeftElement">
              <div className="icon">
                <i className="far fa-clock"></i>
              </div>
              <div className="leftInfos">
                <p>Gagnez du temps</p>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
            <div className="signupLeftElement">
              <div className="icon">
                <i className="far fa-bell"></i>
              </div>
              <div className="leftInfos">
                <p>Soyez les premiers informés</p>
                <p>
                  Créez des alertes Immo ou Emploi et ne manquez jamais
                  l’annonce qui vous intéresse.
                </p>
              </div>
            </div>
            <div className="signupLeftElement">
              <div className="icon">
                <i className="far fa-eye"></i>
              </div>
              <div className="leftInfos">
                <p>Visibilité</p>
                <p>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts reçus).
                </p>
              </div>
            </div>
          </div>
          <div className="signupRight">
            <h2>Créez un compte</h2>
            <hr></hr>
            <form onSubmit={handleSignupSubmit}>
              <div className="inputFlex">
                <label htmlFor="pseudo">Pseudo *</label>
                <input
                  id="pseudo"
                  type="text"
                  value={pseudo}
                  onChange={handlePseudoChange}
                />
              </div>
              <div className="inputFlex">
                <label htmlFor="email">Adresse email *</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flexPassword">
                <div className="inputFlex">
                  <label
                    htmlFor="password"
                    className={errorPassword && "errorLabel"}
                  >
                    Mot de passe *
                  </label>
                  <input
                    id="password"
                    className={errorPassword && "errorInput"}
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="inputFlex">
                  <label
                    htmlFor="confirmpass"
                    className={errorPassword && "errorLabel"}
                  >
                    Confirmer le mot de passe *
                  </label>
                  <input
                    id="confirmPass"
                    className={errorPassword && "errorInput"}
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
              </div>
              {errorPassword && <p className="error">{errorPassword}</p>}
              <div className="checked">
                <input
                  type="checkbox"
                  value={checked}
                  onChange={handleCheckedChange}
                />
                <p className={errorChecked && "errorChecked"}>
                  J’accepte les Conditions Générales de Vente et les Conditions
                  Générales d’Utilisation
                </p>
              </div>
              <input type="submit" value="Créer mon compte personel" />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
