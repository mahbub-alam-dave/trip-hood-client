import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebase.config";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

 const handlePasswordReset = async (e) => {
    e.preventDefault();

    // check if email is empty or invalid
    if (!email) {
      setEmailError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password reset email has been sent.",
        confirmButtonColor: "#3AB0FF",
      }).then(() => navigate("/login"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.message,
        confirmButtonColor: "#3AB0FF",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full px-4 py-3 mb-4 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        //   required
        />

{emailError && (
          <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm mb-4">{emailError}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] font-semibold hover:opacity-90 transition"
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
