import React from "react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
      <div className="text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        {/* Error Icon using Framer Motion */}
        <div className="flex justify-center mb-6">
          <motion.svg
            className="w-24 h-24 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ y: 0 }} // Initial position
            animate={{ y: [0, -10, 0] }} // Animate y position to create bounce effect
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity, // Repeat the animation indefinitely
              repeatType: "loop",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </motion.svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold  mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold  mb-4">
          Page Not Found
        </h2>
        <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-lg mb-8 leading-relaxed">
                    Oops! It looks like you've wandered off the trail. The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

        {/* Button to redirect to home */}
        <a
          href="/"
          className="inline-block bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
