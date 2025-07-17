import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import useAxiosSecure from '../../../utility/hooks/useAxiosSecure'
import Loading from "../../../components/sharedComponents/Loading";



const UpdateStoryPage = () => {

  const { id } = useParams();
  const axiosSecure = useAxiosSecure()

  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm();

  const [removeImages, setRemoveImages] = useState([]);


  // Fetch existing story
  const { data: story =[], isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
        const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/stories/${id}`)
        return res.data
    }
  });

 const [existingImages, setExistingImages] = useState(story.images);
  const [newImages, setNewImages] = useState([]);

  console.log(existingImages)

  // Prefill form fields when story loads
  useEffect(() => {
    if (story) {
      setValue("title", story.title);
      setValue("description", story.description);
      setValue("location", story.location);
      setValue("category", story.category);
      setExistingImages(story.images)
    }
  }, [story, setValue]);


  // Remove existing image from list
  const handleRemoveImage = (url) => {
    console.log(url)
    setRemoveImages((prev) => [...prev, url]);
    setExistingImages(existingImages.filter((i) => i !== url))
  };

  // Upload new image
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_url}`,
      formData
    );
    setNewImages((prev) => [...prev, res.data.data.display_url]);

  }; 



  // Mutation for updating story
/*   const updateStoryMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/stories/update/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Your story has been updated.", "success");
      queryClient.invalidateQueries(["story"]);
    },
  }); */

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
    queryClient.invalidateQueries(["stories-by-user"]); // refetch stories list if needed
    setNewImages([]);  // ✅ Clear newImages after success
  },
  onError: (error) => {
    console.error(error);
    Swal.fire("Error", "Failed to update story", "error");
  }
});

  // On form submit
  const onSubmit = (data) => {
    const updatedFields = {
      title: data.title,
      description: data.description,
      location: data.location,
      category: data.category,
    };

    const updatedData = {
      removeImages,
      addImages: newImages,
      updatedFields,
    };

    updateStoryMutation.mutate(updatedData);
  };

  if (isLoading) return <Loading />

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Update Your Story</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input {...register("title")} className="input-style w-full" placeholder="Story Title" />
        </div>
        <div>
          <label>Description</label>
          <textarea {...register("description")} rows="3" className="input-style w-full" placeholder="Story Description"></textarea>
        </div>
        <div>
          <label>Location</label>
          <input {...register("location")} className="input-style w-full" placeholder="Location" />
        </div>
        <div>
          <label>Category</label>
          <select {...register("category")} className="input-style w-full">
            <option value="Beach">Beach</option>
            <option value="Culture">Culture</option>
            <option value="Adventure">Adventure</option>
            <option value="Nature">Nature</option>
          </select>
        </div>

        {/* Existing Images */}
        <div>
          <label>Existing Images</label>
          <div className="flex flex-wrap gap-3">
            {existingImages?.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} className="w-24 h-24 rounded object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Images */}
        <div>
          <label>Add New Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex flex-wrap gap-2 mt-2">
            {newImages.map((img, index) => (
              <img key={index} src={img} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          Update Story
        </button>
      </form>
    </div>
  );
};

export default UpdateStoryPage;
