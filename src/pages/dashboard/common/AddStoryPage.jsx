import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import {ContextValues} from '../../../utility/contexts/ContextValue'
import { useNavigate } from "react-router";

export default function AddStoryPage() {

  const {user} = useContext(ContextValues);
  const navigate =  useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imageUrl, setImageUrl] = useState("");

  // Image upload handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_url}`,
        formData
      );
      setImageUrl(res.data.data.display_url);
    } catch (error) {
      console.error(error);
      Swal.fire("Failed!", "Image upload failed.", "error");
    }
  };

  const onSubmit = async (data) => {
    const storyData = {
      ...data,
      image: imageUrl,
      date: new Date().toISOString(),
      rating: 0,
      views: 0,
      sharedCount: 0,
      status: "pending",
      comments: 0,
      author: user.displayName,
      email: user.email // Replace dynamically if auth context available
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_app_url}/stories`, storyData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your story has been submitted.", "success");
        reset();
        setImageUrl("");
        navigate('/dashboard/manage-stories')
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to add story.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Share Your Travel Story</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] p-6 rounded-lg shadow shadow-gray-300">

        {/* Title */}
        <div>
          <label className="font-medium">Story Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter your story title"
            className="mt-2 input-style w-full "
          />
          {errors.title && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm">{errors.title.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="font-medium">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Where did you travel?"
            className="mt-2 input-style w-full"
          />
          {errors.location && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm">{errors.location.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <select {...register("category", { required: "Category is required" })} className="mt-2 input-style w-full">
            <option value="">Select Category</option>
            <option value="Nature">Nature</option>
            <option value="Culture">Culture</option>
            <option value="Adventure">Adventure</option>
            <option value="Beach">Beach</option>
          </select>
          {errors.category && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm">{errors.category.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
  <label className="font-medium">Upload Travel Image</label>
  <div className="mt-2 relative w-full h-40 rounded-lg border-2 border-dashed border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">

    {imageUrl && (
      <img
        src={imageUrl}
        alt="Uploaded"
        className="object-cover w-full h-full"
      />
    )}

    {/* Upload Icon — always visible at top-right */}
    <label
      htmlFor="imageUpload"
      className="absolute flex justify-center items-center cursor-pointer transition"
    >
      <FaUpload className="text-lg" />
    </label>

    <input
      id="imageUpload"
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="hidden"
    />
  </div>
</div>


        {/* Description */}
        <div>
          <label className="font-medium">Story Description</label>
          <textarea
            {...register("description", { required: "Description is required", minLength: 30 })}
            rows="4"
            placeholder="Share your story in detail..."
            className="mt-2 input-style w-full"
          />
          {errors.description && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm">{errors.description.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
}
