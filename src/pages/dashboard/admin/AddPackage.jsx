import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
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

  // Image upload handler (imgbb)
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

  // Submit handler
  const onSubmit = async (data) => {
    const packageData = {
      ...data,
      images: imageUrls,
      price: parseFloat(data.price),
      rating: 0,
      reviews: 0,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_app_url}/packages`, packageData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Package added successfully.", "success");
        reset();
        setImageUrls([]);
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to add package.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)]">Add New Tour Package</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Title */}
        <div>
          <label>Package Title</label>
          <input {...register("title", { required: true })} placeholder="Ex: Beachside Bliss at Cox’s Bazar" className="input-style w-full" />
        </div>

        {/* Type */}
        <div>
          <label>Type</label>
          <select {...register("type", { required: true })} className="input-style w-full">
            <option value="">Select Type</option>
            <option>Adventure</option>
            <option>Culture</option>
            <option>Relaxation & Family</option>
            <option>Hiking</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label>Price (BDT)</label>
          <input type="number" {...register("price", { required: true, min: 0 })} placeholder="Ex: 5500" className="input-style w-full" />
        </div>

        {/* Destination */}
        <div>
          <label>Destination</label>
          <input {...register("destination", { required: true })} placeholder="Ex: Cox's Bazar" className="input-style w-full" />
        </div>

        {/* Duration */}
        <div>
          <label>Duration</label>
          <input {...register("duration", { required: true })} placeholder="Ex: 3 Days / 2 Nights" className="input-style w-full" />
        </div>

        {/* Availability */}
        <div>
          <label>Availability</label>
          <input {...register("availability", { required: true })} placeholder="Ex: October - March" className="input-style w-full" />
        </div>

        {/* Group Size */}
        <div>
          <label>Group Size</label>
          <input {...register("groupSize", { required: true })} placeholder="Ex: 2-10 People" className="input-style w-full" />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea {...register("description", { required: true })} rows="3" placeholder="Package description here..." className="input-style w-full"></textarea>
        </div>

        {/* Upload Images */}
        <div>
          <label>Upload Images</label>
          <div className="relative border-2 border-dashed border-[var(--color-primary)] rounded-lg p-4 flex flex-wrap gap-3">
            {imageUrls.map((url, i) => (
              <img key={i} src={url} alt="" className="w-24 h-24 object-cover rounded-lg" />
            ))}
            <label htmlFor="imageUpload" className="w-24 h-24 flex items-center justify-center cursor-pointer bg-gray-100 rounded-lg">
              <FaUpload className="text-2xl text-[var(--color-primary)]" />
            </label>
            <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} multiple className="hidden" />
          </div>
        </div>

        {/* Included */}
        <div>
          <label>Included Services</label>
          {includedFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input {...register(`included.${index}`)} placeholder="Ex: AC Bus Tickets" className="input-style w-full" />
              <button type="button" onClick={() => removeIncluded(index)} className="text-red-500"><FaTrash /></button>
            </div>
          ))}
          <button type="button" onClick={() => appendIncluded("")} className="btn-primary flex items-center gap-1"><FaPlus /> Add Included</button>
        </div>

        {/* Excluded */}
        <div>
          <label>Excluded Services</label>
          {excludedFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input {...register(`excluded.${index}`)} placeholder="Ex: Lunch" className="input-style w-full" />
              <button type="button" onClick={() => removeExcluded(index)} className="text-red-500"><FaTrash /></button>
            </div>
          ))}
          <button type="button" onClick={() => appendExcluded("")} className="btn-primary flex items-center gap-1"><FaPlus /> Add Excluded</button>
        </div>

        {/* Itinerary */}
        <div>
          <label>Itinerary</label>
          {itineraryFields.map((field, index) => (
            <div key={field.id} className="grid md:grid-cols-2 gap-2 mb-3">
              <input {...register(`itinerary.${index}.day`)} placeholder="Day 1" className="input-style w-full" />
              <input {...register(`itinerary.${index}.plan`)} placeholder="Tour plan details" className="input-style w-full" />
              <button type="button" onClick={() => removeItinerary(index)} className="text-red-500 ml-1"><FaTrash /></button>
            </div>
          ))}
          <button type="button" onClick={() => appendItinerary({ day: "", plan: "" })} className="btn-primary flex items-center gap-1"><FaPlus /> Add Itinerary</button>
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary w-full">Add Package</button>

      </form>
    </div>
  );
};

export default AddPackage;
