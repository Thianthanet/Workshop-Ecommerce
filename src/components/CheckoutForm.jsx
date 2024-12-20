import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const token = useEcomStore((state) => state.token)
    const clearCart = useEcomStore((state) => state.clearCart)
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const payload = await stripe.confirmPayment({
            elements,
            // confirmParams: {
            //     // Make sure to change this to your payment completion page
            //     return_url: "http://localhost:3000/complete",
            // },
            redirect: 'if_required'
        });

        console.log('payload', payload)
        if (payload.error) {
            setMessage(payload.error.message);
            console.log('error', payload.error)
            toast.error(payload.error.message)
        } else if (payload.paymentIntent.status == 'succeeded') {
            console.log('Ready or save order')
            saveOrder(token, payload)
                .then((res) => {
                    clearCart()
                    console.log(res)
                    toast.success("Payment Successed!")
                })
                .catch((err) => {
                    console.log(err)
                })
            navigate('/user/history')
        } else {
            console.log('Something wrong!!')
            toast.warning('Payment failed')
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="bg-blue-500 w-full py-2 rounded-md text-white hover:bg-blue-700 hover:translate-y-1 hover:duration-200">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    );
}