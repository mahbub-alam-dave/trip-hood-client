// components/Congratulations.jsx
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use'
import { motion } from "framer-motion";

const Congratulations = ({ onClose }) => {
  const {width, height} = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height} />
      <div className="bg-white dark:bg-black">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 dark:bg-black/60 "
      >
        <div className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-center p-8 rounded-xl shadow-2xl max-w-sm w-full">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] mb-4">🎉 Congratulations!</h2>
          <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-6">
            You've booked more than 3 tours! Thanks for being a loyal traveler 🌍
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] rounded  transition"
          >
            Awesome!
          </button>
        </div>
      </motion.div>
      </div>
    </>
  );
};

export default Congratulations;
