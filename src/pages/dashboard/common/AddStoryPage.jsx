import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // loader spinner
import { ContextValues } from "../../../utility/contexts/ContextValue";
import { useNavigate } from "react-router";
import createAnimation from "../../../assets/Share.json"
import Lottie from "lottie-react";

export default function AddStoryPage() {
  const { user } = useContext(ContextValues);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState([]);


  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const tempUrl = URL.createObjectURL(image);
    setImages((prev) => [...prev, { url: tempUrl, uploading: true }]);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_url}`,
        formData
      );
      const uploadedUrl = res.data.data.display_url;
      setImages((prev) =>
        prev.map((img) =>
          img.url === tempUrl ? { url: uploadedUrl, uploading: false } : img
        )
      );

      URL.revokeObjectURL(tempUrl);
    } catch (error) {
      console.error("Upload failed", error);
      setImages((prev) => prev.filter((img) => img.url !== tempUrl));
      URL.revokeObjectURL(tempUrl);
    }
  };



  const onSubmit = async (data) => {

        const addImages = images
      .filter((img) => !img.uploading)
      .map((img) => img.url);

    const storyData = {
      ...data,
      images: addImages,
      date: new Date().toISOString(),
      rating: 0,
      views: 0,
      sharedCount: 0,
      status: "pending",
      comments: 0,
      author: user.displayName,
      email: user.email, // Replace dynamically if auth context available
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_app_url}/stories`,
        storyData
      );
      if (res.data.insertedId) {
        Swal.fire("Success!", "Your story has been submitted.", "success");
        reset();
        setImages([]);
        navigate("/dashboard/manage-stories");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to add story.", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
    <div className="pt-8">
      <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        Share Your Travel Story
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] p-6 py-8 rounded-lg shadow "
      >
        {/* Title */}
        <div>
          <label className="font-medium">Story Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter your story title"
            className="mt-2 input-style w-full "
          />
          {errors.title && (
            <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="font-medium">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Where did you travel?"
            className="mt-2 input-style w-full"
          />
          {errors.location && (
            <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="mt-2 input-style w-full"
          >
            <option className="dark:bg-gray-700" value="Nature">Nature</option>
            <option className="dark:bg-gray-700" value="Culture">Culture</option>
            <option className="dark:bg-gray-700" value="">Select Category</option>
            <option className="dark:bg-gray-700" value="Adventure">Adventure</option>
            <option className="dark:bg-gray-700" value="Beach">Beach</option>
          </select>
          {errors.category && (
            <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
{/*         <div>
          <label className="font-medium">Upload Travel Image</label>
          <div className="mt-2 relative w-full h-40 rounded-lg border-2 border-dashed border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-hidden flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="object-cover w-full h-full"
              />
            )}

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
        </div> */}
        {/* New Image Upload */}
        <div>
          <label>Upload New Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border border-[var(--color-border)] dark:border-[var(--color-border-dark)] p-2 rounded" />
          <div className="flex flex-wrap gap-3 mt-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                {img.uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <ClipLoader size={20} color="#fff" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        

        {/* Description */}
        <div>
          <label className="font-medium">Story Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: 30,
            })}
            rows="4"
            placeholder="Share your story in detail..."
            className="mt-2 input-style w-full"
          />
          {errors.description && (
            <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] text-sm">
              {errors.description.message}
            </p>
          )}
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
        <div className="-order-1 lg:order-1 w-[70%] lg:w-full justify-self-center">
          <Lottie animationData={createAnimation} loop={true}/>
        </div>
    </div>
  );
}
