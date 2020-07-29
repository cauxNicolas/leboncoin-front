import React from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import axios from "axios";

const CheckoutForm = ({ stripe, userToken, description, price }) => {
  const clickToPay = async () => {
    const StripeResponse = await stripe.createToken({
      name: userToken,
    });
    const stripeToken = StripeResponse.token.id;
    const priceToString = price.toString();

    const response = await axios.post(process.env.REACT_APP_API_URL + `/pay`, {
      stripeToken: stripeToken,
      description: description,
      amount: priceToString,
    });
    console.log(response);
  };

  return (
    <div>
      <CardElement />
      <button onClick={clickToPay}>Valider</button>
    </div>
  );
};

export default injectStripe(CheckoutForm);
