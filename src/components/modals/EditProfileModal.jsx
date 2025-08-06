import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaCamera } from "react-icons/fa";

const EditProfileModal = ({ isOpen, setIsOpen, userData, image, avatar, register, errors, handleImageChange, handleSubmit, onSubmit }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" leave="ease-in duration-200"
          enterFrom="opacity-0" enterTo="opacity-100"
          leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white dark:bg-black " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-5 mt-20">
          <div className="flex min-h-full items-start justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" leave="ease-in duration-200"
              enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] p-4 sm:p-8 shadow-xl transition-all">
                <Dialog.Title className="text-xl font-semibold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-6">
                  Edit Profile
                </Dialog.Title>

                {/* Scrollable content */}
                <div className="flex flex-col max-h-[80vh] overflow-y-auto space-y-5">
                  {/* Profile Image */}
                  <div className="relative w-16 h-16 mx-auto">
                    <img
                      src={image || userData?.photo || avatar}
                      alt="Profile"
                      className="w-16 h-16 rounded-full border-2 border-[var(--color-primary)] object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 hover:opacity-100 transition">
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

                  {/* Form */}
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
              onClick={() => setIsOpen(false)}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProfileModal;
