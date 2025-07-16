import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
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
  const navigate = useNavigate()

  const {data: booking, isLoading, isError} = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${id}`);
      return res.data;
    },
    enabled: !!id,  // only runs when id is available
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

try {
  const res = await axios.post(`${import.meta.env.VITE_app_url}/create-payment-intent`, {
    price: 5500,
    packageId: booking._id
  });

  const card = elements.getElement(CardElement)

  const clientSecret = res.data.clientSecret;

  const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        name: booking.touristName,
        email: booking.touristEmail
      },
    },
  });

  if (error) {
    Swal.fire("Failed!", error.message, "error");
    return;
  }

  if (paymentIntent.status === "succeeded") {
    setSuccess("Payment successful!");
    setError("");

    await axiosSecure.patch(`/bookings/pay/${booking._id}`)

    const paymentData = {
      bookingId: booking._id,
      touristEmail: booking.touristEmail,
      touristName: booking.touristName,
      amount: booking.price,
      transactionId: paymentIntent.id,
      paymentMethod: paymentIntent.payment_method_types,
      paymentAt: new Date().toISOString()
    };

    const paymentRes = await axiosSecure.post(`/payments`, paymentData);
    console.log(paymentRes, paymentRes.data)

    if (paymentRes.data.insertedId) {
      await Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        html: `
          <p><strong>Amount:</strong> ${booking.price} Taka</p>
          <p><strong>Transaction ID:</strong> ${paymentIntent.id}</p>
        `,
        confirmButtonText: "OK",
      });
      navigate('/dashboard/my-bookings')
    }
  }

} catch (err) {
  console.error(err)
  setError("Something went wrong. Please try again")
}

finally {
  setProcessing(false);  // ✅ this now safely runs once
}

  };

const [theme, setTheme] = useState(localStorage.getItem("theme"));

useEffect(() => {
  const handleThemeChange = () => {
    setTheme(localStorage.getItem("theme"));
  };

  window.addEventListener("storage", handleThemeChange);

  return () => {
    window.removeEventListener("storage", handleThemeChange);
  };
}, []);

console.log(theme)

const cardStyle = {
  style: {
    base: {
      color: theme === "dark" ? '#BBBBBB' : '#364153',
      fontSize: '16px',
      '::placeholder': {
        color: theme === "dark" ? 'var(--color-border-dark)' : 'var(--color-border)',
      },
    },
    invalid: {
      color: 'var(--color-accent)',
    },
  },
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <CardElement options={cardStyle} className="border p-4 rounded-lg text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] dark:bg-gray-700 border-[var(--color-border)] dark:border-[var(--color-border-dark)]" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-2 px-4 bg-[var(--color-primary)] text-[var(--color-text-primary-two)] rounded-lg hover:bg-[var(--color-primary-dark)] transition"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {error && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] mt-2">{error}</p>}
      {success && <p className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mt-2">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
