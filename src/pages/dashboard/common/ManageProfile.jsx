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
import SimpleModal from "../../../components/modals/SimpleModal";
import EditProfileModal from "../../../components/modals/EditProfileModal";

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
      language: guideData?.language?.join(", ") || "",
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
    photo: finalImage,
    status: "active"
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

       <div className=" bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-2xl py-8 px-6 space-y-2 mb-6 dark:border dark:border-[var(--color-border-dark)] shadow-md">
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
        <p><strong>Name:</strong> {userData.name}</p>
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
            {guideData.status === "pending" && <p className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">Update user profile with required fields to be visible as a guide</p>}
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
      {/* isOpen, setIsOpen, userData, image, avatar, register, errors, handleImageChange, handleSubmit, onSubmit */}
      <div className="ml-5">
        <EditProfileModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        userData={userData}
        register={register}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        guideData={guideData}
        image={image}
        >

        </EditProfileModal>
      </div>
    </div>
  );
};

export default ManageProfile;
