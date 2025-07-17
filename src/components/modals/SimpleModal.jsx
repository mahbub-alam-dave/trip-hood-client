import { useEffect } from "react";

const SimpleModal = ({ isOpen, onClose, title, children }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-white/90 dark:bg-black/90 p-5 overflow-y-auto">
      <div className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-lg shadow-lg max-w-xl w-full mt-10 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        {/* Modal content */}
        {title && (
          <h2 className="text-xl font-semibold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mt-4 mb-6">
            {title}
          </h2>
        )}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default SimpleModal;
