import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Publish = () => {
  const userToken = Cookies.get("token");

  const [titleInput, setTitleInput] = useState("titre");
  const [textInput, setTextInput] = useState("texte de l'annonce");
  const [priceInput, setPriceInput] = useState(10);
  const [file, setFile] = useState();

  const history = useHistory();

  const handleTitleInput = (event) => {
    setTitleInput(event.target.value);
  };

  const handleTextInput = (event) => {
    setTextInput(event.target.value);
  };

  const handlePriceInput = (event) => {
    setPriceInput(event.target.value);
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userToken) {
      alert(
        `Bonjour, vous devez être connecté pour déposer une annonce, vous allez être redirigé sur la page Login ...`
      );
      history.push("/login");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", titleInput);
      formData.append("description", textInput);
      formData.append("price", priceInput);

      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + `/offer/publish`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + userToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        history.push(`/offer/${response.data._id}`);
      } catch (err) {
        if (err.response.status === 500) {
          console.error("An error occurred");
        } else {
          console.error(err.response.data.msg);
        }
      }
    }
  };

  return (
    <div id="publish">
      <div className="publishContent">
        <h2>Déposer une annonce</h2>
        <form onSubmit={handleSubmit}>
          <hr></hr>
          <div>
            <label htmlFor="title">Titre de l'annonce *</label>
            <input
              id="title"
              type="text"
              value={titleInput}
              onChange={handleTitleInput}
            />
          </div>
          <div>
            <label htmlFor="text">Texte de l'anonnce *</label>
            <textarea
              id="text"
              value={textInput}
              onChange={handleTextInput}
              rows="8"
            />
          </div>
          <div>
            <label htmlFor="price">Prix *</label>
            <input
              id="price"
              type="number"
              value={priceInput}
              onChange={handlePriceInput}
            />
          </div>
          <div>
            <label htmlFor="file">Photo *</label>
            <input idm="file" type="file" onChange={handleFile} />
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Publish;
