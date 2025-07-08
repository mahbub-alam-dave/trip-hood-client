import { Link } from "react-router";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
        {/* Logo and site name */}
        <div className="flex flex-col items-center md:items-start gap-2">
        <div className="flex items-center gap-3">
          {/* <img src="/logo.svg" alt="Mr. Touree Logo" className="w-10 h-10" /> */}
          <span className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Trip Hood</span>
        </div>
        <p className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-center md:text-left">
            Explore the world, discover unforgettable experiences.
          </p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-base">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 dark:hover:text-[var(--color-primary-dark)]">
            <FaGithub /> GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">
            <FaGlobe /> Portfolio
          </a>
        </div>
      </div>

      {/* CopyRight */}
      <div className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-sm">
          &copy; {new Date().getFullYear()} Trip Hood — All rights reserved. Designed & Developed by Mahbub Alam.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
