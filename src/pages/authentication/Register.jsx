import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { ContextValues } from "../../utility/contexts/ContextValue";
import axios from "axios";
import useSimpleAxios from "../../utility/hooks/useSimpleAxios";
import GoogleSignIn from "../../components/sharedComponents/GoogleSignIn";
import avatar from '../../assets/avatar.png'


const Register = () => {
  const { registerUser, updateUser } = useContext(ContextValues);
  // const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState()

  const axiosApi = useSimpleAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle image preview
  const handleImageChange = async (e) => {
  const image = e.target.files[0];
  if (!image) return;

  const formData = new FormData();
  formData.append("image", image);

  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_url}`,
      formData
    );
    setImage(res.data.data.display_url);
  } catch (error) {
    console.error("Image upload failed", error);
    Swal.fire({
      icon: "error",
      title: "Image upload failed",
      text: error.message,
    });
  }
};


  const onSubmit = async(data) => {
    const { name, email, password } = data;

    const userData = {
      name,
      email,
      photo: image,
      role: "tourist", 
      createdAt: new Date().toISOString(),
      lastSignedIn: new Date().toISOString(),

    }


    registerUser(email, password)
      .then(async() => {
        // const user = result.user;
        const userImage = image ? image : avatar
        updateUser({displayName: name, photoURL: userImage}
          // add user info to data base
        );
        const res = await axiosApi.post(`${import.meta.env.VITE_app_url}/users`, userData)

        if(res.data.insertedId) {
          console.log('user data updated', res.data)
        }

        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Welcome to Freindy Tour!",
          timer: 2000,
          showConfirmButton: false,
        });

        reset();
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  

  return (
    <div className="py-24">
    <div className="max-w-md mx-auto p-8 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 ">
        Register to Tour Hood
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <label htmlFor="photo" className="cursor-pointer relative">
          {image ? (
            <img src={image} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-[var(--color-primary)]" />
          ) : (
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500">
              <FaUserCircle size={48} />
            </div>
          )}
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
          {errors.name && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]  text-sm mt-1">{errors.name.message}</p>}
        </div>

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
            className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
          {errors.email && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]  text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { 
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?\\/-]).{6,}$/,
    message: "Password must have uppercase, lowercase, and a special character",
  }
})}
            className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
          {errors.password && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]  text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Register
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        <span className="mx-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
      </div>

      {/* Google Sign-In */}
      <GoogleSignIn />

      {/* Login link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-two)] hover:underline"
        >
          Login here
        </Link>
      </p>
      
    </div>
    </div>
  );
};

export default Register;
