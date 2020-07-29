import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const userToken = Cookies.get("token");
  const history = useHistory();

  const goToPay = () => {
    if (!userToken) {
      alert(`Vous allez être redirigé pour vous connecter`);
      history.push("/login");
    } else {
      history.push("/payment", {
        _id: data._id,
        username: data.creator.account.username,
        picture: data.picture.secure_url,
        title: data.title,
        description: data.description,
        price: data.price,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <main>
      {isLoading === true ? (
        <p>Chargement en cours ...</p>
      ) : (
        <>
          <div id="mainOffer">
            <div className="offer">
              <div className="offerElement">
                <img src={data.picture.secure_url} alt={data.title} />
                <div className="offerInfos">
                  <div>
                    <h2>{data.title}</h2>
                    <p className="price">{data.price} €</p>
                  </div>
                  <div>
                    <p>{data.created}</p>
                  </div>
                </div>
              </div>
              <p className="bold">Description</p>
              <p className="offerDescription">{data.description}</p>
            </div>
            <div id="card">
              <h2>{data.creator.account.username}</h2>
              <p className="blueCard">17 annonces en ligne</p>
              <hr></hr>
              <button onClick={goToPay}>
                <i className="fas fa-cart-plus"></i>Acheter
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Offer;
