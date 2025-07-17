import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // loader spinner
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";

const UpdateStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm();

  const [existingImages, setExistingImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // Fetch story
  const { data: story, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${id}`);
      return res.data;
    },
  });

  // Prefill form on story load
  useEffect(() => {
    if (story) {
      setValue("title", story.title);
      setValue("description", story.description);
      setValue("location", story.location);
      setValue("category", story.category);
      setExistingImages(story.images);
    }
  }, [story, setValue]);

  // Remove existing image
  const handleRemoveImage = (url) => {
    setRemoveImages((prev) => [...prev, url]);
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  // Upload new image
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const tempUrl = URL.createObjectURL(image);
    setNewImages((prev) => [...prev, { url: tempUrl, uploading: true }]);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_url}`,
        formData
      );
      const uploadedUrl = res.data.data.display_url;

      setNewImages((prev) =>
        prev.map((img) =>
          img.url === tempUrl ? { url: uploadedUrl, uploading: false } : img
        )
      );

      URL.revokeObjectURL(tempUrl);
    } catch (error) {
      console.error("Upload failed", error);
      setNewImages((prev) => prev.filter((img) => img.url !== tempUrl));
      URL.revokeObjectURL(tempUrl);
    }
  };

  // Mutation to update story
  const updateStoryMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(
        `/stories/update/${id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Story updated successfully!", "success");
      queryClient.invalidateQueries(["stories-by-user"]);
      setNewImages([]); // clear images after update
      setRemoveImages([]);
    },
    onError: (error) => {
      console.error(error);
      Swal.fire("Error", "Failed to update story", "error");
    },
  });

  // Submit form
  const onSubmit = (data) => {
    const updatedFields = {
      title: data.title,
      description: data.description,
      location: data.location,
      category: data.category,
    };

    const addImages = newImages
      .filter((img) => !img.uploading)
      .map((img) => img.url);

    const updatedData = {
      removeImages,
      addImages,
      updatedFields,
    };

    updateStoryMutation.mutate(updatedData);
  };

  if (isLoading) return <p className="text-center mt-20">Loading Story...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Update Your Story</h2>
    <div className=" p-8 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] shadow dark:shadow-gray-300 rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">

        <div>
          <label>Title</label>
          <input {...register("title", { required: "Title is required" })} className="input-style w-full" />
        </div>

        <div>
          <label>Description</label>
          <textarea {...register("description", { required: "Description is required" })} rows="4" className="input-style w-full"></textarea>
        </div>

        <div>
          <label>Location</label>
          <input {...register("location", { required: "Location is required" })} className="input-style w-full" />
        </div>

        <div>
          <label>Category</label>
          <select {...register("category", { required: "Category is required" })} className="input-style w-full">
            <option value="">Select Category</option>
            <option value="Nature">Nature</option>
            <option value="Adventure">Adventure</option>
            <option value="Culture">Culture</option>
            <option value="Beach">Beach</option>
          </select>
        </div>

        {/* Existing Images */}
        <div>
          <label>Existing Images</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {existingImages.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                <img src={img} alt="Story" className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemoveImage(img)}
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 text-xs rounded-bl"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Image Upload */}
        <div>
          <label>Upload New Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border border-[var(--color-border)] dark:border-[var(--color-border-dark)] p-2 rounded" />
          <div className="flex flex-wrap gap-3 mt-3">
            {newImages.map((img, idx) => (
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

        <div className="flex items-center gap-3">
          <Link to={-1}>
                  <button
          type="submit"
          className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-text-primary-two)] rounded-lg dark:bg-[var(--color-accent-dark)] cursor-pointer"
        >
          Go Back
        </button>
          </Link>
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-primary-two)] rounded-lg dark:bg-[var(--color-primary-dark)] cursor-pointer"
        >
          Update Story
        </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateStory;
