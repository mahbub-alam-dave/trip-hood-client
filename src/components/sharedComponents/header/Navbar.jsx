import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes, FaUserCircle, FaThLarge, FaSignOutAlt } from "react-icons/fa";
import { ContextValues } from "../../../utility/contexts/ContextValue";
import ToggleIcon from "./ToggleIcon";
import avatar from '../../../assets/avatar.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOutUser } = useContext(ContextValues);

  const handleLogout = () => {
    signOutUser()
    .then(() => {
      // logged out successfully
    })
    .catch(error => {
      console.log(error)
    })
    setDropdownOpen(false);
  };

  return (
    <header className="w-full bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] shadow-sm border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-24 px-4 sm:px-6 lg:px-8">
        {/* Logo & Name */}
        <Link to="/" className="flex items-center gap-2 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] font-bold text-2xl">
          {/* <img src="/logo.svg" alt="logo" className="w-12 h-12" /> */}
          Trip Hood
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 text-base text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] font-medium">
          <NavLink to="/" className="hover:text-[var(--color-primary)]">Home</NavLink>
          <NavLink to="/community" className="hover:text-[var(--color-primary)]">Community</NavLink>
          <NavLink to="/about" className="hover:text-[var(--color-primary)]">About Us</NavLink>
          <NavLink to="/trips" className="hover:text-[var(--color-primary)]">Trips</NavLink>

          {/* Auth Buttons */}
          {user ? (
            <div className="relative flex justify-center">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src={user.photoURL || avatar} alt="User" className="w-10 h-10 rounded-full  object-cover" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg shadow-lg p-4 space-y-3">
                  <div className="text-center">
                    <p className="font-semibold text-lg">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <hr />
                  <NavLink to="/dashboard" className="flex items-center gap-2 text-sm hover:text-[var(--color-primary)]">
                    <FaThLarge /> Dashboard
                  </NavLink>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 w-full">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="px-6 py-3 font-semibold bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] rounded-lg hover:bg-blue-600 transition">Login</NavLink>
          )}
            <ToggleIcon setMenuOpen={setMenuOpen} menuOpen={setMenuOpen}/>
        </nav>

        {/* Mobile menu button */}
        <button className="lg:hidden text-3xl text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <nav className="flex flex-col items-start gap-4 p-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] text-base">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/community" onClick={() => setMenuOpen(false)}>Community</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
            <NavLink to="/trips" onClick={() => setMenuOpen(false)}>Trips</NavLink>

            <div className="flex items-start">
            {user ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mt-4">
                  <img src={user.photoURL || avatar} alt="User" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 mt-3 hover:text-[var(--color-primary)]">
                  <FaThLarge /> Dashboard
                </NavLink>
                <button onClick={handleLogout} className="flex items-center mt-3 gap-2 text-sm text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] hover:text-red-800">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="px-6 py-3 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] rounded-lg mt-3 w-full text-center">Login</NavLink>
            )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
