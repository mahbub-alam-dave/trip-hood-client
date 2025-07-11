import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ContextValues } from "../../utility/contexts/ContextValue";
import GoogleSignIn from "../../components/sharedComponents/GoogleSignIn";
import useSimpleAxios from "../../utility/hooks/useSimpleAxios";

const Login = () => {
  const { loginUser } = useContext(ContextValues);
  const navigate = useNavigate();
  const simpleAxios = useSimpleAxios()

  const location = useLocation()


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then(async(result) => {

      // save user info to the database
      const userData = {
          // name: result.user?.displayName || "annonymous",
          email: result.user?.email,
          // role: "tourist",
          // createdAt: new Date().toISOString(),
          lastSignedIn: new Date().toISOString(),
        };

        const res = await simpleAxios.post(`${import.meta.env.VITE_app_url}/users`, userData)
        console.log(res.data.inserted)

        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "You’re now logged in.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        navigate(location.state || '/');
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        })
      );
  };


  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 ">
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
            className="w-full px-4 py-3  rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
          {errors.email && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]  text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
          {errors.password && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]  text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] font-semibold hover:opacity-90 transition"
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

      <GoogleSignIn />

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
