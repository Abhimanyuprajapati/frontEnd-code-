import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
const domain = process.env.NEXT_PUBLIC_DOMAIN;
export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page + stripe payment_intent_client_secret
        return_url: `${domain}/subscriptions/payments?error=false&&message=Payment Successfull&&userId=${props.userId}&&orderId=${props.orderId}&&paymentId=${props.paymentId}&&packageId=${props.packageId}&&gatewayName=Stripe`,
      },
    });
    //subscriptions/payments?status=true&&message=sucess&&orderid=ORDER_ID791868&&paymentid=62f27b57649e64c048be96ec &&packageid=62f0f933cb2ac8e87ad6ff0d
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      router.push(`${domain}/subscriptions/payments?error=true&&message=Card Issue&&userId=${props.userId}&&orderId=${props.orderId}&&paymentId=${props.paymentId}&&packageId=${props.packageId}&&gatewayName=Stripe`)
    } else {
      setMessage("An unexpected error occurred.");
      router.push(`${domain}/subscriptions/payments?error=true&&message=Unexpected Error Occured&&userId=${props.userId}&&orderId=${props.orderId}&&paymentId=${props.paymentId}&&packageId=${props.packageId}&&gatewayName=Stripe`)
      //
    }
    setIsLoading(false);
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}      
    </form>
  );
}