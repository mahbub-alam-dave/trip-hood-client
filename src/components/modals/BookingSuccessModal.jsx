import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const BookingSuccessModal = ({ isOpen, bookingId }) => {


  const navigate = useNavigate()

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl relative">
        
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Booking Successful!</h2>
        <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-6">
          Thank you for your booking. You can now view or confirm your bookings.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
          onClick={() => navigate(`/dashboard/payment/${bookingId}`)}
          className="w-full px-4 py-2 rounded-lg bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] font-semibold hover:bg-[var(--color-primary-dark)] transition"
          >
            Confirm Booking
          </button>

          <Link
            to="/dashboard/my-bookings"
            className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] font-semibold hover:bg-[var(--color-primary)] dark:hover:hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-text-primary-dark)] transition text-center"
          >
            See All Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
