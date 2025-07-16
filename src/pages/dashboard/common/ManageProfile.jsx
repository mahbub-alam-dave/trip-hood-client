import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { FaEdit } from "react-icons/fa";
import { ContextValues } from "../../../utility/contexts/ContextValue";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import avatar from '../../../assets/avatar.png'
import { FaCamera, FaUserTie } from "react-icons/fa";
import { Link } from "react-router";
import axios from "axios";
import AdminStats from "./AdminStats";

Modal.setAppElement("#root");

const ManageProfile = () => {

  const { user, updateUser } = useContext(ContextValues)
  const axiosSecure = useAxiosSecure()

  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState()
  // const [errors, setErrors] = useState()
  

//   fetch user data
const { data: userData = {}, isLoading, } = useQuery({
  queryKey: ["user-data", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/by-email/${user.email}`);
    return res.data;
  },
  enabled: !!user?.email,
});


  // Fetch guide-specific info if guide
  const { data: guideData = {} } = useQuery({
    queryKey: ["guide-profile", user?.email],
    queryFn: async () => {
      if (userData?.role === "tour_guide") {
        const res = await axiosSecure.get(`/guides/by-email/${user.email}`);
        return res.data;
      }
      return null;
    },
    enabled: !!user?.email && userData?.role === "tour_guide",
  });


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Open modal and preload form data
  const openModal = () => {
    const formValues = {
      name: userData?.name || "",
      email: userData?.email || "",
      role: userData?.role || "",
      age: guideData?.age || "",
      phone: guideData?.phone || "",
      experience: guideData?.experience || "",
      nationalId: guideData?.nationalId || "",
      coverageArea: guideData?.coverageArea?.join(", ") || "",
      expertise: guideData?.expertise?.join(", ") || "",
      language: guideData?.language,
      description: guideData?.description || "",
    };
    reset(formValues);
    setModalIsOpen(true);
    setImage(userData.photo)
  };

  // Update Mutation
/*   const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`${import.meta.env.VITE_app_url}/profile/update`, updatedData);
      console.log(res.data)
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Profile updated successfully.", "success");
      queryClient.invalidateQueries();
      setModalIsOpen(false);
    },
  });

  const [image, setImage] = useState(userData.photo);

  const onSubmit = (data) => {

    if(image && data.name) {
      updateUser({displayName: data.name, photoURL: image})
      .then(() => {
      })
      .catch(error => {
        console.log(error.message)
      })
    }

    if (userData?.role === "tour_guide") {
      data.coverageArea = data.coverageArea.split(",").map((item) => item.trim());
      data.expertise = data.expertise.split(",").map((item) => item.trim());
    }
    const updatedData = {...data, photo: image}
    updateProfileMutation.mutate(updatedData);
  };


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
}; */

const updateProfileMutation = useMutation({
  mutationFn: async (updatedData) => {
    const res = await axiosSecure.patch(`/profile/update`, updatedData);
    return res.data;
  },
  onSuccess: async (res, variables) => {
    if (variables.name && variables.photo) {
      try {
        await updateUser({ displayName: variables.name, photoURL: variables.photo });
      } catch (error) {
        console.error("Firebase update failed", error);
      }
    }

    Swal.fire("Success!", "Profile updated successfully.", "success");
    queryClient.invalidateQueries();
    setModalIsOpen(false);
  },
  onError: (error) => {
    Swal.fire("Error!", "Failed to update profile.", "error");
    console.error(error);
  }
});

const onSubmit = (formData) => {

  const finalImage = image || userData.photo;

  const cleanData = {
    ...formData,
    photo: finalImage
  };

  if (userData?.role === "tour_guide") {
    cleanData.coverageArea = formData.coverageArea.split(",").map((item) => item.trim());
    cleanData.expertise = formData.expertise.split(",").map((item) => item.trim());
    cleanData.language = formData.language.split(",").map((item) => item.trim());
  }

  updateProfileMutation.mutate(cleanData);
};

const handleImageChange = async (e) => {
  const imageFile = e.target.files[0];
  if (!imageFile) return;

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_url}`,
      formData
    );
    setImage(res.data.data.display_url);
  } catch (error) {
    console.error("Image upload failed", error);
    Swal.fire("Error!", "Image upload failed.", "error");
  }
};


  if(isLoading) return <span className="loading loading-spinner"></span>

  return (
    <div className="mt-4">

       <div className=" bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] shadow rounded-2xl py-8 px-6 space-y-2 mb-6 dark:border dark:border-[var(--color-border-dark)] shadow-md">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
          Welcome back, {user?.displayName?.split(" ")[0]}! 👋
        </h1>
        <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          Manage your profile details and keep everything up to date.
        </p>
      </div>


      {/* <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Manage Profile</h2>
      </div> */}

      {
        userData.role === "admin" &&
        <AdminStats />
      }
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-6">
          Profile Details
        </h3>

      <div className="flex flex-col sm:flex-row gap-6 justify-between items-start bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-lg shadow-md dark:border dark:border-[var(--color-border-dark)] p-6">
      <div className="flex-1 space-y-4">
        <img
    src={userData?.photo || avatar}
    alt="Profile"
    className="w-16 h-16 object-cover rounded-full border-2 border-[var(--color-primary)]"
  />
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p className="break-all"><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {userData?.role}</p>

        {userData?.role === "tour_guide" && guideData && (
          <>
            <p><strong>Age:</strong> {guideData.age}</p>
            <p><strong>Phone:</strong> {guideData.phone}</p>
            <p><strong>NationId:</strong> {guideData.nationalId}</p>
            <p><strong>Coverage Area:</strong> {guideData.coverageArea?.join(", ")}</p>
            <p><strong>Experience:</strong> {guideData.experience} years</p>
            <p><strong>Expertise:</strong> {guideData.expertise?.join(", ")}</p>
            <p><strong>Language:</strong> {guideData.language?.join(", ")}</p>
            <p><strong>Description:</strong> {guideData.description}</p>
          </>
        )}
      </div>
<button
          onClick={openModal}
          className="flex  items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition"
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      {
        userData.role === "tourist" &&
        <div className="mt-6 flex ">
      <Link
        to="/dashboard/join-as-guide"
        className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition"
      >
        <FaUserTie className="text-lg" />
        <span className="font-medium">Apply for Tour Guide</span>
      </Link>
    </div>
      }

      {/* Modal */}
      <div className="ml-5">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        parentSelector={() => document.getElementById("dashboard-content")}
        contentLabel="Edit Profile"
        className="max-w-xl w-full mx-auto mt-10 p-4 sm:p-8 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-lg shadow-lg outline-none overflow-hidden"
        overlayClassName="fixed inset-0 bg-white/95 dark:bg-black/95 flex items-start justify-center p-5 z-50"
      >
        <div className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-semibold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-6">Edit Profile</h2>

        
        <div className=" overflow-y-auto space-y-5 flex-1">

{/* Profile Image */}
      <div className="relative w-16 h-16 mx-auto">
  <img
    src={image || userData?.photo || avatar}
    alt="Profile"
    className="w-16 h-16 rounded-full border-2 border-[var(--color-primary)] object-cover"
  />

  {/* Camera Icon overlay */}
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 hover:opacity-100 transition">
    <label htmlFor="imageUpload" className="cursor-pointer text-[var(--color-text-primary-two)] text-2xl">
      <FaCamera />
    </label>
  </div>

  <input
    id="imageUpload"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />
</div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:p-4 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
        
            {/* Basic Fields */}
    <div>
      <label>Name</label>
      <input {...register("name")} className="input-style w-full" />
    </div>
  <div className={`grid ${userData.role === "tour_guide" && "md:grid-cols-2"} gap-4`}>
    <div>
      <label>Email</label>
      <input readOnly {...register("email")} className="input-style w-full " />
    </div>
    <div>
      <label>Role</label>
      <input readOnly {...register("role")} className="input-style w-full" />
    </div>
  </div>

          {userData?.role === "tour_guide" && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
  {/* Age */}
  <div>
    <label>Age <span className="text-red-500">*</span></label>
    <input 
      type="number"
      placeholder="Enter your age"
      {...register("age", { 
        required: "Age is required",
        min: { value: 18, message: "Minimum age is 18" },
      })}
      className="input-style w-full"
    />
    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
  </div>

  {/* Phone */}
  <div>
    <label>Phone <span className="text-red-500">*</span></label>
    <input 
      type="tel"
      placeholder="e.g. +8801700000000"
      {...register("phone", { 
        required: "Phone number is required",
        pattern: {
          value: /^\+?\d{10,15}$/,
          message: "Enter a valid phone number"
        }
      })}
      className="input-style w-full"
    />
    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
  </div>

  {/* Experience */}
  <div>
    <label>Experience (in years) <span className="text-red-500">*</span></label>
    <input 
      type="number"
      placeholder="e.g. 5"
      {...register("experience", { 
        required: "Experience is required", 
        min: { value: 0, message: "Must be at least 0 years" }
      })}
      className="input-style w-full"
    />
    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
  </div>

  {/* National ID */}
  <div>
    <label>National ID <span className="text-red-500">*</span></label>
    <input 
      type="number"
      placeholder="Enter your National ID"
      {...register("nationalId", { 
        required: "National ID is required",
        minLength: { value: 10, message: "At least 10 digits required" }
      })}
      className="input-style w-full"
    />
    {errors.nationalId && <p className="text-red-500 text-sm mt-1">{errors.nationalId.message}</p>}
  </div>

  {/* Coverage Areas */}
  <div className="md:col-span-2">
    <label>Coverage Areas (comma separated) <span className="text-red-500">*</span></label>
    <input 
      type="text"
      placeholder="e.g. Bandarban, Cox's Bazar, Rangamati"
      {...register("coverageArea", { required: "Coverage Areas are required" })}
      className="input-style w-full"
    />
    {errors.coverageArea && <p className="text-red-500 text-sm mt-1">{errors.coverageArea.message}</p>}
  </div>

  {/* Expertise */}
  <div className="md:col-span-2">
    <label>Expertise (comma separated) <span className="text-red-500">*</span></label>
    <input 
      type="text"
      placeholder="e.g. Waterfall Trails, Camping Adventures"
      {...register("expertise", { required: "Expertise is required" })}
      className="input-style w-full"
    />
    {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise.message}</p>}
  </div>

  {/* Languages */}
  <div className="md:col-span-2">
    <label>Languages (comma separated) <span className="text-red-500">*</span></label>
    <input 
      type="text"
      placeholder="e.g. Bangla, English, Chakma"
      {...register("language", { required: "Languages are required" })}
      className="input-style w-full"
    />
    {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>}
  </div>

  {/* Description */}
  <div className="md:col-span-2">
    <label>Description <span className="text-red-500">*</span></label>
    <textarea 
      placeholder="Describe your experience and specialties"
      {...register("description", { required: "Description is required" })} 
      rows="3"
      className="input-style w-full"
    ></textarea>
    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
  </div>
</div>

            </>
          )}

          <div className="flex justify-end flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 border rounded-lg text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-primary-two)] rounded-lg dark:bg-[var(--color-primary-dark)] cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
        </div>
        </div>
      </Modal>
      </div>
    </div>
  );
};

export default ManageProfile;
