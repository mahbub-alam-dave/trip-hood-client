import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ContextValues } from '../../utility/contexts/ContextValue';
import { useNavigate } from 'react-router';

const PackageBooking = async() => {

    const {user} = useContext(ContextValues)
    const navigate = useNavigate()

      const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const onSubmit = () => {

        if (!user) {
  navigate("/login")
  return;
        }

  const newBooking = {
  ...data,
  status: 'pending',
  packageId: package._id
}
await axiosSecure.post('/bookings', newBooking)

Swal.fire({
  title: 'Booking Successful!',
  text: 'Your booking request has been sent. What next?',
  icon: 'success',
  showCancelButton: true,
  confirmButtonText: 'Go to My Bookings',
  cancelButtonText: 'Close'
}).then(result => {
  if (result.isConfirmed) {
    navigate('/my-bookings');
  }
})



      }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 dark:bg-[var(--color-bg-primary-dark)] p-6 rounded-xl">
  <input {...register("touristName", { required: true })} placeholder="Your Name" className="input" />
  <input {...register("email", { required: true })} placeholder="Your Email" className="input" />
  <input type="text" value={user.photoURL} readOnly className="input" />
  <input type="number" value={price} readOnly className="input" />
  
  <Controller
    control={control}
    name="tourDate"
    rules={{ required: true }}
    render={({ field }) => <DatePicker onChange={field.onChange} value={field.value} />}
  />

  <select {...register("tourGuide", { required: true })} className="input">
    <option value="">Select Guide</option>
    {availableGuides.map(guide => (
      <option key={guide._id} value={guide.email}>{guide.name}</option>
    ))}
  </select>

  <button className="btn-primary">Book Now</button>
</form>

        </div>
    );
};

export default PackageBooking;