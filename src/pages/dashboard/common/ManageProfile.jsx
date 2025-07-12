import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { FaEdit } from "react-icons/fa";
import { ContextValues } from "../../../utility/contexts/ContextValue";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import avatar from '../../../assets/avatar.png'
import { FaUserCircle, FaCamera } from "react-icons/fa";
import axios from "axios";

Modal.setAppElement("#root");

const ManageProfile = () => {

  const { user } = useContext(ContextValues)
  const axiosSecure = useAxiosSecure()

  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState('');

//   fetch user data
const { data: userData = {}, isLoading } = useQuery({
  queryKey: ["user-data", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/by-email/${user.email}`);
    return res.data;
  },
  enabled: !!user?.email,
});

console.log(userData?.role)


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

  const { register, handleSubmit, reset } = useForm();

  // Open modal and preload form data
  const openModal = () => {
    const formValues = {
      name: userData?.name || "",
      email: userData?.email || "",
      role: userData?.role || "",
      age: guideData?.age || "",
      phone: guideData?.phone || "",
      coverageArea: guideData?.coverageArea?.join(", ") || "",
      expertise: guideData?.expertise?.join(", ") || "",
      description: guideData?.description || "",
    };
    reset(formValues);
    setModalIsOpen(true);
  };

  // Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const url =
        userData?.role === "tour_guide"
          ? `/guides/update/${guideData._id}`
          : `/users/update/${user.email}`;
      const res = await axiosSecure.patch(url, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Profile updated successfully.", "success");
      queryClient.invalidateQueries();
      setModalIsOpen(false);
    },
  });

  const onSubmit = (data) => {
    if (userData?.role === "tour_guide") {
      data.coverageArea = data.coverageArea.split(",").map((item) => item.trim());
      data.expertise = data.expertise.split(",").map((item) => item.trim());
    }
    updateProfileMutation.mutate(data);
  };

// image update
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

  if(isLoading) return <span className="loading loading-spinner"></span>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Manage Profile</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition"
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      <div className="bg-white dark:bg-[var(--color-bg-primary-dark)] p-6 rounded-lg shadow-md space-y-4">
        <img
    src={userData?.photoURL || avatar}
    alt="Profile"
    className="w-16 h-16 rounded-full border-2 border-[var(--color-primary)]"
  />
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {userData?.role}</p>

        {userData?.role === "tour_guide" && guideData && (
          <>
            <p><strong>Age:</strong> {guideData.age}</p>
            <p><strong>Phone:</strong> {guideData.phone}</p>
            <p><strong>Coverage Area:</strong> {guideData.coverageArea?.join(", ")}</p>
            <p><strong>Expertise:</strong> {guideData.expertise?.join(", ")}</p>
            <p><strong>Description:</strong> {guideData.description}</p>
          </>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        // parentSelector={() => document.getElementById("dashboard-content")}
        contentLabel="Edit Profile"
        className="max-w-xl mx-auto mt-20 p-8 bg-white dark:bg-[var(--color-bg-primary-dark)] rounded-lg shadow-lg outline-none overflow-hidden"
        overlayClassName="fixed inset-0 bg-white/95 dark:bg-black/95 flex items-start justify-center z-50"
      >
        <div className="bg-white dark:bg-[var(--color-bg-primary-dark)] rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
{/* Profile Image */}
      <div className="relative w-24 h-24 mx-auto">
  <img
    src={image || userData?.photoURL || avatar}
    alt="Profile"
    className="w-24 h-24 rounded-full border-2 border-[var(--color-primary)] object-cover"
  />

  {/* Camera Icon overlay */}
  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full opacity-0 hover:opacity-100 transition">
    <label htmlFor="imageUpload" className="cursor-pointer text-white text-2xl">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
            {/* Basic Fields */}
  <div className="grid md:grid-cols-2 gap-4">
    <div>
      <label>Name</label>
      <input {...register("name")} className="input-style w-full" />
    </div>
    <div>
      <label>Email</label>
      <input readOnly {...register("email")} className="input-style w-full bg-gray-100 dark:bg-gray-800" />
    </div>
    <div>
      <label>Role</label>
      <input readOnly {...register("role")} className="input-style w-full bg-gray-100 dark:bg-gray-800" />
    </div>
  </div>

          {userData?.role === "tour_guide" && (
            <>
              <div className="grid md:grid-cols-2 gap-4">
        <div><label>Age</label><input {...register("age")} className="input-style w-full" /></div>
        <div><label>Phone</label><input {...register("phone")} className="input-style w-full" /></div>
        <div className="md:col-span-2"><label>Coverage Areas</label><input {...register("coverageArea")} className="input-style w-full" /></div>
        <div className="md:col-span-2"><label>Expertise</label><input {...register("expertise")} className="input-style w-full" /></div>
        <div className="md:col-span-2"><label>Description</label><textarea {...register("description")} rows="3" className="input-style w-full"></textarea></div>
      </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
            >
              Save Changes
            </button>
          </div>
        </form>
        </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProfile;
