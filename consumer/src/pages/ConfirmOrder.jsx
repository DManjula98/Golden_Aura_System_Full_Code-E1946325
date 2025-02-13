import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import error from "../assets/error.png";
import success from "../assets/success.png";
import { loadStripe } from "@stripe/stripe-js";
import { stripe_sky } from "../utils/config";
const load = async () => {
  return await loadStripe(stripe_sky);
};

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;
        case "processing":
          setMessage("processing");
          break;
        case "requires_payment_method":
          setMessage("failed");
          break;
        default:
          setMessage("failed");
      }
    });
  }, [stripe]);

  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };
  useEffect(() => {
    get_load();
  }, []);

  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`);
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
    }
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
    {message === "failed" || message === "processing" ? (
      <>
        <img src={error} alt="error logo" />
        <Link
          className="px-5 py-2 bg-green-500 rounded-sm text-white"
          to="/dashboard/my-orders"
        >
          Back to the Dashboard
        </Link>
      </>
    ) : message === "succeeded" ? (
      loader ? (
        <FadeLoader />
      ) : (
        <>
          {showPopup ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-5 rounded shadow-md text-center">
                <h2 className="text-xl font-bold text-green-600">
                  Order Confirmed!
                </h2>
                <p className="mt-2 text-gray-700">
                  Your order has been successfully confirmed, and the receipt
                  has been sent to your email.
                </p>
                <button
                  className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-sm"
                  onClick={() => setShowPopup(false)} 
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              <img src={success} alt="success logo" />
              <Link
                className="px-5 py-2 bg-green-500 rounded-sm text-white"
                to="/dashboard/my-orders"
              >
                Back to Dashboard
              </Link>
            </>
          )}
        </>
      )
    ) : (
      <FadeLoader />
    )}
  </div>
);
};
export default ConfirmOrder;
