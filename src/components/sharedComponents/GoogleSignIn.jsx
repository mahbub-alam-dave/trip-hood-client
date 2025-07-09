import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { ContextValues } from "../../utility/contexts/ContextValue";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useSimpleAxios from "../../utility/hooks/useSimpleAxios";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const simpleAxios = useSimpleAxios()
  const { googleSignIn } = useContext(ContextValues);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async(result) => {
        // save user info to the database
        const userData = {
          name: result.user?.displayName || "annonymous",
          email: result.user?.email,
          role: "tourist",
          createdAt: new Date().toISOString(),
          lastSignedIn: new Date().toISOString(),
        };

        const res = await simpleAxios.post(`${import.meta.env.VITE_app_url}/users`, userData)
        console.log(res.data.inserted)


        Swal.fire({
          icon: "success",
          title: "Logged in with Google!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message,
        })
      );
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)]  hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <FaGoogle />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
