import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useContext } from "react";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import { ContextValues } from "../../../utility/contexts/ContextValue";
import NoData from "../../../components/sharedComponents/NoData";
import Loading from "../../../components/sharedComponents/Loading";



const MyAssignedTours = () => {
  const { user } = useContext(ContextValues);
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();

  const { data: assignedTours = [], isLoading } = useQuery({
    queryKey: ["assigned-tours", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assigned-tours?guideEmail=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/assigned-tours/status/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assigned-tours"]);
    },
  });

  const handleAccept = (id) => {
    updateStatusMutation.mutate({ id, status: "Accepted" });
  };

  const handleReject = (id) => {
    console.log("reject button clicked")
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this tour.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, status: "Rejected" });
      }
    });
  };

  if (isLoading) return <Loading />

  if(assignedTours.length === 0) {
    return <NoData message="No assigned tours found"/>
  }

  return (
    <div className="">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">My Assigned Tours</h2>

      <div className="overflow-x-auto bg-[var--color-bg-primary] dark:bg-[var(--color-bg-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)]">
            <tr>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Tourist</th>
              <th className="px-4 py-3">Tour Date</th>
              <th className="px-4 py-3">Price (৳)</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            {assignedTours.map((booking) => (
              <tr key={booking._id} className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-gray-100 dark:hover:bg-gray-800 text-center">
                <td className="px-4 py-3 font-medium">{booking.destination}</td>
                <td className="px-4 py-3">{booking.touristName}</td>
                <td className="px-4 py-3">{new Date(booking.tourDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">{booking.price} BDT.</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs  ${
                      booking.status === "Accepted"
                        ? "bg-green-500 text-[var(--color-text-primary-two)]"
                        : booking.status === "Rejected"
                        ? "bg-red-500 text-[var(--color-text-primary-two)]"
                        : booking.status === "In Review"
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-400 text-[var(--color-text-primary-two)]"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex flex-wrap items-center justify-center text-center gap-2">
                  <button
                    disabled={booking.status !== "in_review"}
                    onClick={() => handleAccept(booking._id)}
                    className={`px-3 py-1 rounded flex items-center gap-1 ${
                      booking.status === "in_review"
                        ? "bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FaCheck /> Accept
                  </button>

                  <button
                    disabled={booking.status !== "in_review"}
                    onClick={() => handleReject(booking._id)}
                    className={`px-3 py-1 rounded flex items-center gap-1 ${
                      booking.status === "in_review"
                        ? "bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-[var(--color-text-primary-two)] hover:bg-red-600 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FaTimes /> Reject
                  </button>
                </td>
              </tr>
            ))}

            {/* {assignedTours.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No assigned tours found.
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignedTours;
