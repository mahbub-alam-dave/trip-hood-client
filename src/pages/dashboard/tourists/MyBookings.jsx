import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { FaMoneyBillWave, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { ContextValues } from "../../../utility/contexts/ContextValue";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";


const MyBookings = () => {
  
  const { user } = useContext(ContextValues);
  const axiosSecure = useAxiosSecure()

    const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


const cancelBookingMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axiosSecure.delete(`/bookings/${id}`);
    return res.data;
  },
  onSuccess: () => {
    Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
    queryClient.invalidateQueries(["my-bookings"]);
  },
});

const handleCancelBooking = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this booking!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it!",
  }).then((result) => {
    if (result.isConfirmed) {
      cancelBookingMutation.mutate(id);
    }
  });
};



  if (isLoading) return <div className="text-center py-20">Loading your bookings...</div>;

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">My Bookings</h2>

      <div className="overflow-x-auto rounded-lg shadow border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary-two)]">
            <tr>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Tour Date</th>
              <th className="px-4 py-3">Guide</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            {bookings.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-[var(--color-text-secondary)]">
                  No bookings found.
                </td>
              </tr>
            )}

            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="px-4 py-3">{booking.packageName}</td>
                <td className="px-4 py-3">{booking.price} BDT</td>
                <td className="px-4 py-3">{new Date(booking.tourDate).toLocaleString()}</td>
                <td className="px-4 py-3">{booking.guideName}</td>
                <td className="px-4 py-3 capitalize">{booking.status}</td>
                <td className="px-4 py-3 flex items-center gap-2 justify-center">
                  {booking.status === "pending" && (
                    <>
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <button className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-600 transition text-sm">
                        <FaMoneyBillWave /> Pay
                      </button>
                      </Link>
                      <button  onClick={() => handleCancelBooking(booking._id)} className="bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-[var(--color-text-primary-two)] px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600 transition text-sm">
                        <FaTimesCircle /> Cancel
                      </button>
                    </>
                  )}
                  {booking.status === "paid" && (
                    <button className="bg-gray-400 cursor-not-allowed text-[var(--color-text-primary-two)] px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
                      <FaCheckCircle /> Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
