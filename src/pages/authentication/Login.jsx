import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ContextValues } from "../../utility/contexts/ContextValue";

const Login = () => {
  const { loginUser, googleSignIn } = useContext(ContextValues);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "You’re now logged in.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        navigate("/");
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        })
      );
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
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
    <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-[var(--color-primary)] dark:text-[var(--color-primary-two)]">
        Welcome Back!
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-two)] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-white font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        <span className="mx-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
      </div>

      {/* Google Sign-In */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <FaGoogle />
        Sign in with Google
      </button>

      {/* Register link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-two)] hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
