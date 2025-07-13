import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";

const CheckoutForm = () => {

    const {id} = useParams()
    const axiosSecure = useAxiosSecure()

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [processing, setProcessing] = useState(false);

  const {data: booking, isLoading, isError} = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/bookings/${id}`);
      return res.data;
    },
    enabled: !!id,  // only runs when id is available
  });

  console.log(booking)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
        const card = elements.getElement(CardElement)
        if(card === null) {
            setError("Card information is missing")
            setProcessing(false)
            return
        }

        setError('')

        const res = await axios.post(`${import.meta.env.VITE_app_url}/create-payment-intent`, {
          price: 5500,
          packageId: booking._id
           // dynamically pass price based on booking
        });
    
        const clientSecret = res.data.clientSecret;

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: booking.touristName,
              email: booking.touristEmail
            },
          },
        });
    
        if (error) {
          Swal.fire("Failed!", error.message, "error");
        } else {
          if (paymentIntent.status === "succeeded") {
            setSuccess("Payment successful!");
            Swal.fire("Success!", "Payment completed successfully!", "success");
            // Optionally update payment status in bookings collection here via API
          }
        }
    }

    catch(error) {
        console.error(error)
        setError("Something went wrong. Please try again")
    }
    
    finally {
    setProcessing(false);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement className="border p-4 rounded-lg dark:bg-gray-700" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-2 px-4 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {error && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mt-2">{error}</p>}
      {success && <p className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mt-2">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
