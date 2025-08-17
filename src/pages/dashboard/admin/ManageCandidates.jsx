import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import { Dialog } from "@headlessui/react";
import { FaUserCheck, FaUserTimes, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import NoData from "../../../components/sharedComponents/NoData";
import Loading from "../../../components/sharedComponents/Loading";

const ManageCandidates = () => {

    const axiosSecure = useAxiosSecure()

  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["guideApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guide-applications`);
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (applicationData) => {
      return await axiosSecure.post(`/guide-applications/accept/${applicationData._id}`, applicationData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["guideApplications"]);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/guide-applications/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["guideApplications"]);
    },
  });

  const handleAccept = (applicationData) => {
    acceptMutation.mutate(applicationData, {
      onSuccess: () => {
        Swal.fire("Accepted!", "The application has been accepted.", "success");
      },
      onError: () => {
          Swal.fire("Error!", "The application update failed", "error");
        },
    });
  };

  const handleReject = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This application will be permanently rejected!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e3342f", // red
    cancelButtonColor: "#6b7280",  // gray
    confirmButtonText: "Yes, reject it!",
  }).then((result) => {
    if (result.isConfirmed) {
      rejectMutation.mutate(id, {
        onSuccess: () => {
          Swal.fire("Rejected!", "The application has been removed.", "success");
        },
        onError: () => {
          Swal.fire("Error!", "Failed to reject the application.", "error");
        },
      });
    }
  });
};

  const openModal = (app) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApp(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <Loading />
      if(!applications || applications.length === 0) {
        return <NoData message="No application found"/>
      }

  return (
    <div className="">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Manage Guide Applications</h2>
    <div className=" ">
      <div className="overflow-x-auto bg-[var--color-bg-primary] dark:bg-[var(--color-bg-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg ">
        <table className="min-w-full table-auto rounded-lg ">
          <thead className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)]">
            <tr className="">
              <th className="py-2 px-4 "></th>
              <th className="py-2 px-4  ">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            {applications.map((app, index) => (
              <tr key={app._id} className="border-t hover:bg-gray-100 dark:hover:bg-gray-800 border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
                <td className="py-2 px-4 text-center">{index + 1}</td>
                <td className="py-2 px-4 text-center">{app.name}</td>
                <td className="py-2 px-4 text-center">{app.email}</td>
                <td className="py-2 px-4 text-center flex justify-center flex-wrap gap-2">
                  <button
                    onClick={() => openModal(app)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleAccept(app)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <FaUserTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4 dark:text-white">
              Application Details
            </Dialog.Title>
            {selectedApp && (
              <div className="space-y-2 text-sm dark:text-gray-200">
                <p><strong>Name:</strong> {selectedApp.name}</p>
                <p><strong>Email:</strong> {selectedApp.email}</p>
                <p><strong>Why Tour Guide:</strong> {selectedApp.reason}</p>
                {/* <p><strong>Location:</strong> {selectedApp.location}</p> */}
                {/* <p><strong>Experience:</strong> {selectedApp.experience}</p> */}
                {/* <p><strong>Languages:</strong> {selectedApp.language}</p> */}
                <a href={selectedApp.cvLink} target="_blank" rel="noreferrer" className="text-blue-500 underline">View CV</a>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600">
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
    </div>
  );
};

export default ManageCandidates;
