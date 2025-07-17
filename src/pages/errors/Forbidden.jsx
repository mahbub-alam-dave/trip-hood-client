import React from 'react';
import { motion } from 'framer-motion';

const Forbidden = () => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
            <div className="text-center bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] p-8 md:p-12 rounded-xl shadow-lg max-w-md w-full">
                {/* Forbidden Icon (SVG) */}
                <div className="flex justify-center mb-6">
                    <motion.svg
                        className="w-24 h-24 text-[var(--color-accent)] dark-[var(--color-accent-dark)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* Lock icon */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </motion.svg>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-4">403</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-4">Access Denied</h2>
                <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-lg mb-8 leading-relaxed">
                    You don't have permission to access this page. It looks like you've tried to reach a restricted area.
                </p>

                {/* Button to redirect to home */}
                {/* In a real React app, you would use React Router's Link component here */}
                <a href="/" className="inline-block bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default Forbidden;