import { Link } from "react-router";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import logoLight from '../../assets/logoLight.png'
import logoDark from '../../assets/logoDark.png'
import useThemeMode from "../../utility/hooks/useThemeMode";

const Footer = ({location}) => {
  const theme = useThemeMode()
  return (
<footer className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] mt-20">
  <div className={`${location === "root" ? "max-w-7xl mx-auto" : location === "dashboard" ? "": "" } px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center`}>

    {/* Logo and site name */}
    <div className="flex flex-col items-center md:items-start gap-3">
      <div className="flex items-center gap-3">
        <img src={theme === "dark" ? logoDark : logoLight } alt="" />
        <span className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Trip Hood</span>
      </div>
      <p className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-center md:text-left">
        Explore the world, discover unforgettable experiences.
      </p>

      {/* Developer Links */}
      <div className="flex gap-6 mt-4 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-base">
        <a href="https://github.com/yourusername" target="_blank" className="flex items-center gap-1 dark:hover:text-[var(--color-primary-dark)]">
          <FaGithub /> GitHub
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" className="flex items-center gap-1 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">
          <FaLinkedin /> LinkedIn
        </a>
        <a href="https://yourportfolio.com" target="_blank" className="flex items-center gap-1 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]">
          <FaGlobe /> Portfolio
        </a>
      </div>
    </div>

    {/* Newsletter + App CTA */}
    <div className="flex flex-col items-center md:items-end gap-6 w-full">

  {/* Newsletter Form */}
  <form className="flex w-full max-w-md rounded-lg overflow-hidden border border-[var(--color-border)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
    <input
      type="email"
      placeholder="Enter your email"
      className="flex-1 px-4 py-3 w-full bg-white dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-primary)] focus:outline-none placeholder-gray-400"
    />
    <button
      type="submit"
      className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-white px-5 font-medium transition hover:bg-opacity-90"
    >
      Subscribe
    </button>
  </form>

  {/* App Download Buttons */}
  <div className="flex gap-5 flex-wrap justify-center md:justify-end">

  {/* App Store Card */}
  <div className="flex items-center gap-3 bg-transparent border border-[var(--color-border)] rounded-lg p-2 hover:shadow-lg transition hover:scale-105">
    <img
      src="https://i.ibb.co/YBFvfs6s/app-store.png"
      alt="App Store"
      className="h-8 w-auto"
    />
    <div>
      <p className="text-xs text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Download on</p>
      <h4 className="font-bold text-sm text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">App Store</h4>
    </div>
  </div>

  {/* Play Store Card */}
  <div className="flex items-center gap-3 bg-transparent border border-[var(--color-border)] rounded-lg p-2 hover:shadow-lg transition hover:scale-105">
    <img
      src="https://i.ibb.co/WW5Qg8sq/app.png"
      alt="Google Play"
      className="h-8 w-auto"
    />
    <div>
      <p className="text-xs text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Get it on</p>
      <h4 className="font-bold text-sm text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Google Play</h4>
    </div>
  </div>

</div>

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
