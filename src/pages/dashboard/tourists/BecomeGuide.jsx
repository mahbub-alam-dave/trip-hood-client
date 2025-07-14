import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ContextValues } from "../../../utility/contexts/ContextValue";

const BecomeGuide = () => {
  
  const {user} = useContext(ContextValues)
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (applicationData) => {
      const res = await axios.post(
        `${import.meta.env.VITE_app_url}/guide-applications`,
        applicationData
      );
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire("Application Submitted!", data.message, "success");
      reset();
    },
    onError: (error) => {
      Swal.fire("Error!", error.response?.data?.message || "Failed to submit application.", "error");
    },
  });

  const onSubmit = (data) => {
    const applicationData = {...data, email: user.email, name: user.displayName}
    console.log(applicationData)
    mutate(applicationData);
  };

  return (
    <div className=" max-w-3xl mx-auto pt-10">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-8 text-center">
        Become a Tour Guide
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] p-6 rounded-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] shadow-sm dark:shadow-gray-500">

        {/* Application Title */}
        <div>
          <label className="block  font-medium mb-1">Application Title</label>
          <input
            type="text"
            {...register("title", { required: "Application title is required" })}
            placeholder="Ex: Expert Hill Track Guide"
            className="w-full input-style"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Why wants to be a Tour Guide */}
        <div>
          <label className="block font-medium mb-1">Why do you want to be a Tour Guide?</label>
          <textarea
            {...register("reason", { required: "Please explain why you want to be a guide" })}
            placeholder="Write your motivation here..."
            rows="4"
            className="w-full input-style"
          ></textarea>
          {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
        </div>

        {/* CV Link */}
        <div>
          <label className="block font-medium mb-1">CV / Resume Link</label>
          <input
            type="url"
            {...register("cvLink", { required: "CV link is required" })}
            placeholder="https://your-cv-link.com"
            className="w-full input-style"
          />
          {errors.cvLink && <p className="text-red-500 text-sm mt-1">{errors.cvLink.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="">
          <button
            type="submit"
            className="px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white dark:bg-[var(--color-bg-primary-dark)] p-6 rounded-lg shadow-lg text-center">
            <Dialog.Title className="text-lg font-semibold mb-3">Application Submitted!</Dialog.Title>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">Your application has been received. We’ll review it and contact you soon.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)]"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default BecomeGuide;
