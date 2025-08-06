import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";

const PlanTourModal = ({ isOpen, onClose, user }) => {
  const [planText, setPlanText] = useState("");
  const axiosSecure = useAxiosSecure()

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        userId: user._id,
        email: user.email,
        plan: planText,
        createdAt: new Date(),
      };
      const res = await axiosSecure.post("/custom-tour-requests", payload);
      return res.data;
    },
    onSuccess: () => {
      setPlanText("");
      onClose();
      Swal.fire("Success", "Your tour plan has been submitted!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit your request.", "error");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] bg-opacity-30 flex justify-center items-center">
      <div className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] w-full max-w-lg mx-auto rounded-xl shadow-lg p-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] text-start">

        <h2 className="text-2xl font-semibold mb-2">Plan Your Custom Tour</h2>
        <p className=" text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-4">
          Tell us your ideal trip — destinations, dates, group size or activities — and we’ll tailor it for you.
        </p>
        <textarea
          rows="6"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none resize-none"
          placeholder="Describe your custom tour plan..."
          value={planText}
          onChange={(e) => setPlanText(e.target.value)}
        />

        <div className="flex items-center gap-4">
        <button
        className="px-5 py-2 mt-4 rounded-md bg-[var(--color-accent)] dark:bg-[var(-color-accent-dark)] text-[var(--color-text-primary-two)]"
        onClick={onClose}
        >
         Cancel
        </button>
            <button
          onClick={() => mutate()}
          disabled={isLoading || !planText.trim()}
          className="mt-4 px-5 py-2 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] rounded-md"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
        </div>
      </div>
    </div>
  );
};

export default PlanTourModal;
