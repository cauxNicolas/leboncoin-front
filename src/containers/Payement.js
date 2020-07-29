import React from "react";
import { useLocation } from "react-router-dom";
import { StripeProvider, Elements } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";
import Cookies from "js-cookie";

const Payement = () => {
  const location = useLocation();
  const userToken = Cookies.get("token");
  console.log("userToken", userToken);
  let { picture, title, description, price } = location.state;

  return (
    <main>
      <div id="pay">
        <div className="contentPay">
          <h2>Acheter en ligne</h2>
          <div className="picture">
            <img src={picture} alt={title} />
          </div>
          <div className="payTitle">
            <p>{title}</p>
          </div>
          <div className="payPrice">
            <p>{price} €</p>
          </div>
          <div className="blocPayment">
            <p>Vos coordonnées bancaires</p>
            <StripeProvider apiKey={process.env.REACT_APP_API_STRIPE_PUBLIC}>
              <Elements>
                <CheckoutForm
                  userToken={userToken}
                  description={description}
                  price={price}
                />
              </Elements>
            </StripeProvider>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payement;
