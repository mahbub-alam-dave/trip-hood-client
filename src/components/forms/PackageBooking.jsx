import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContextValues } from "../../utility/contexts/ContextValue";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";
import bookingAnimation from '../../utility/animations/bookingAnimation.json'
import Lottie from "lottie-react";

import avatar from '../../assets/avatar.png'
import { useNavigate } from "react-router";
import BookingSuccessModal from "../modals/BookingSuccessModal";


const BookingForm = ({ packageData, guides }) => {

  const { user } = useContext(ContextValues);
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tourDate, setTourDate] = useState(new Date());
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  // 📦 Mutation setup
  const bookingMutation = useMutation({
    mutationFn: async (bookingData) => {
      const res = await axiosSecure.post("/bookings", bookingData);
      return res.data;
    },
    onSuccess: () => {
      setIsModalOpen(true)
      Swal.fire({
        icon: "success",
        title: "Booking Confirmed",
        text: "Your booking request has been submitted.",
      });
      queryClient.invalidateQueries(["my-bookings"]); // if you have a bookings list query
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Something went wrong. Please try again.",
      });
    },
  });

  const onSubmit = (data) => {

    if(!user) {
      navigate('/login')
      return
    }

    const { selectedGuide, ...restData } = data;
    const parsedGuide = JSON.parse(selectedGuide);

    const bookingData = {
      ...restData,
      tourDate,
      packageId: packageData._id,
      price: packageData.price,
      destination: packageData.destination,
      touristName: user?.displayName,
      touristEmail: user?.email,
      photo: user?.photoURL,
      guideName: parsedGuide.name,
      guideEmail: parsedGuide.email,
    };

    console.log(bookingData)

    bookingMutation.mutate(bookingData);
  };

  // const defaultAvatar = "https://i.ibb.co/5n5hspb/default-avatar.png";
//   console.log("User:", user);
// console.log("Is booking pending:", bookingMutation.isPending);

  return (
    <div className="space-y-7">
      <div className=" space-y-2">
        <h2 className="text-2xl font-bold text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Book This Tour</h2>
        <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-sm">Fill the details to reserve your seat.</p>
      </div>
   <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 items-center">


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] py-12 rounded-xl shadow-lg">
      {/* Tourist Photo */}
      <div className="flex flex-col gap-2">
        <img
          src={user?.photoURL || avatar}
          alt="Tourist Avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-[var(--color-primary)] dark:border-[var(--color-primary-dark)]"
        />
        {/* <p className="text-xs text-[var(--color-text-secondary)]">Your Profile Photo</p> */}
      </div>
        {/* Tourist Name */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Tourist Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            placeholder="Tourist name"
            className="mt-1 w-full px-4 py-2 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
        </div>

        {/* Tourist Email */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            placeholder="Tourist email"
            className="mt-1 w-full px-4 py-2 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text-primary)]">Tour Price</label>
          <input
            type="text"
            value={`${packageData.price || ""} BDT.`}
            readOnly
            className="mt-1 w-full px-4 py-2 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
        </div>

        {/* Tour Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[var(--color-text-primary)]">Select Tour Date</label>
          <ReactDatePicker
            selected={tourDate}
            onChange={setTourDate}
            className="mt-1 w-full px-4 py-2 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
          />
        </div>

        {/* Tour Guide Dropdown */}
        <div>
          <label className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Select Tour Guide</label>
          <select
            {...register("selectedGuide", { required: true })}
            className="mt-1 w-full px-4 py-2 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] dark:focus:ring-[var(--color-primary-two)]"
            defaultValue=""
          >
            <option className="dark:bg-gray-600" value="" disabled>Select a guide</option>
            {guides.map((guide) => (
              <option key={guide._id} className="hover:bg-[var(--color-primary)] dark:bg-gray-600" value={JSON.stringify({ name: guide.name, email: guide.email })}>
                {guide.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={bookingMutation.isPending}
          className="w-full bg-[var(--color-primary)] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[var(--color-primary-dark)] transition-all duration-200"
        >
          {bookingMutation.isPending ? "Booking..." : "Book Now"}
        </button>

        {user ? "" : <span className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">Please, login to book a package...</span>}
      </form>
    

     {/* Right: Lottie Animation */}
{/*         <div className="hidden md:flex justify-center dark:bg-[var(--color-bg-dark)]">
          <Lottie animationData={bookingAnimation} loop autoplay />
        </div> */}
        <div className="p-6 rounded-xl bg-transparent  transition-all hidden md:block -order-1 md:order-1">
  <Lottie animationData={bookingAnimation} loop autoplay className="h-96" />
</div>
        </div>

        <BookingSuccessModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>


        </div>
    
  );
};

export default BookingForm;
