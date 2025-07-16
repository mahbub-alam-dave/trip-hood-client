import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlus, FaTrash, FaUpload } from "react-icons/fa";

const AddPackage = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      images: [],
      itinerary: [{ day: "", plan: "" }],
      included: [""],
      excluded: [""],
    },
  });

  const [imageUrls, setImageUrls] = useState([]);
  const queryClient = useQueryClient();

  // Field Arrays
  const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({
    control,
    name: "itinerary",
  });

  const { fields: includedFields, append: appendIncluded, remove: removeIncluded } = useFieldArray({
    control,
    name: "included",
  });

  const { fields: excludedFields, append: appendExcluded, remove: removeExcluded } = useFieldArray({
    control,
    name: "excluded",
  });

  // Image Upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_url}`,
          formData
        );
        setImageUrls((prev) => [...prev, res.data.data.display_url]);
      } catch (err) {
        console.error("Image Upload Failed", err);
      }
    }
  };

  // Mutation for adding package
  const addPackageMutation = useMutation({
    mutationFn: async (packageData) => {
      const res = await axios.post(`${import.meta.env.VITE_app_url}/packages`, packageData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Package added successfully.", "success");
      queryClient.invalidateQueries(["packages"]); // invalidate if you have a package list query
      reset();
      setImageUrls([]);
    },
    onError: (err) => {
      console.error(err);
      Swal.fire("Error!", "Failed to add package.", "error");
    },
  });

  // Form submit
  const onSubmit = (data) => {
    const packageData = {
      ...data,
      images: imageUrls,
      price: parseFloat(data.price),
      rating: 0,
      reviews: 0,
      currency: "BDT"
    };

    addPackageMutation.mutate(packageData);
  };

  return (
    <div className="max-w-4xl mx-auto  pt-8">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] lg:text-center">Add New Tour Package</h2>
    <div className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] p-8 shadow rounded-2xl shadow-gray-300">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label>Package Title</label>
          <input {...register("title", { required: true })} placeholder="Ex: Beachside Bliss" className="mt-2 input-style w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <label>Type</label>
          <select {...register("type", { required: true })} className="mt-2 input-style w-full ">
            <option className="dark:bg-gray-400" value="">Select Type</option>
            <option className="dark:bg-gray-400">Adventure</option>
            <option className="dark:bg-gray-400">Culture</option>
            <option className="dark:bg-gray-400">Relaxation & Family</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label>Price (BDT)</label>
          <input type="number" {...register("price", { required: true, min: 0 })} placeholder="5500" className="mt-2 input-style w-full" />
        </div>

        {/* Destination */}
        <div>
          <label>Destination</label>
          <input {...register("destination", { required: true })} placeholder="Cox's Bazar" className="mt-2 input-style w-full" />
        </div>

        {/* Duration */}
        <div>
          <label>Duration</label>
          <input {...register("duration", { required: true })} placeholder="3 Days / 2 Nights" className="mt-2 input-style w-full" />
        </div>

        {/* Availability */}
        <div>
          <label>Availability</label>
          <input {...register("availability", { required: true })} placeholder="October - March" className="mt-2 input-style w-full" />
        </div>

        {/* Group Size */}
        <div>
          <label>Group Size</label>
          <input {...register("groupSize", { required: true })} placeholder="2-10 People" className="mt-2 input-style w-full" />
        </div>

        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea {...register("description", { required: true })} rows="3" placeholder="Package details here..." className="mt-2 input-style w-full"></textarea>
        </div>

        {/* Images */}
        <div>
          <label>Upload Images</label>
          <div className="mt-2 relative border-2 border-dashed border-[var(--color-primary)] dark:border-[var(--color-primary-dark)] rounded-lg p-4 flex flex-wrap gap-3">
            {imageUrls.map((url, i) => (
              <img key={i} src={url} alt="" className="w-24 h-24 object-cover rounded-lg" />
            ))}
            <label htmlFor="imageUpload" className="w-24 h-24 flex items-center justify-center cursor-pointer bg-gray-100 dark:bg-gray-600/30 rounded-lg">
              <FaUpload className="text-2xl text-[var(--color-primary)]" />
            </label>
            <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} multiple className="hidden" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Included */}
        <div>
          <label>Included Services</label>
          {includedFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-3 mt-2">
              <input {...register(`included.${index}`)} placeholder="Ex: AC Bus Tickets" className="input-style w-full" />
              <button type="button" onClick={() => removeIncluded(index)} className="mt-2 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"><FaTrash /></button>
            </div>
          ))}
          <button type="button" onClick={() => appendIncluded("")} className="mt-2 border-none btn bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] flex items-center gap-1"><FaPlus /> Add Included</button>
        </div>

        {/* Excluded */}
        <div>
          <label>Excluded Services</label>
          {excludedFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2 mt-2">
              <input {...register(`excluded.${index}`)} placeholder="Ex: Lunch" className="nt-2 input-style w-full" />
              <button type="button" onClick={() => removeExcluded(index)} className="mt-2 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"><FaTrash /></button>
            </div>
          ))}
          <button type="button" onClick={() => appendExcluded("")} className="mt-2 border-none btn bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-[var(--color-text-primary-two)] flex items-center gap-1"><FaPlus /> Add Excluded</button>
        </div>
        </div>

        {/* Itinerary */}
        <div>
          <label>Itinerary</label>
          {itineraryFields.map((field, index) => (
            <div key={field.id} className="grid md:grid-cols-2 gap-4 mb-3 mt-2">
              <input {...register(`itinerary.${index}.day`)} placeholder="Day 1" className="input-style w-full" />
              <input {...register(`itinerary.${index}.plan`)} placeholder="Tour plan" className="input-style w-full" />
              <button type="button" onClick={() => removeItinerary(index)} className=" text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] ml-1"><FaTrash /></button>
            </div>
          ))}
          <button type="button" onClick={() => appendItinerary({ day: "", plan: "" })} className="mt-2 btn bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary-two)] flex items-center border-none gap-1"><FaPlus /> Add Itinerary</button>
        </div>

        {/* Submit */}
        <button type="submit" disabled={addPackageMutation.isLoading} className="w-full bg-[var(--color-primary)] text-[var(--color-text-primary-two)] py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition">
          {addPackageMutation.isLoading ? "Adding..." : "Add Package"}
        </button>

      </form>
    </div>
    </div>
  );
};

export default AddPackage;
