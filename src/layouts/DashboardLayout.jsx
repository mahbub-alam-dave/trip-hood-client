import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaBars, FaTimes, FaUserCircle, FaBookmark, FaPlusCircle, FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { RiGuideLine } from "react-icons/ri";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log("this is dashboard page")

  const navLinks = [
    { to: "/dashboard/profile", label: "Manage Profile", icon: <FaUserCircle /> },
    { to: "/dashboard/bookings", label: "My Bookings", icon: <FaBookmark /> },
    { to: "/dashboard/manage-stories", label: "Manage Stories", icon: <FaBookOpen /> },
    { to: "/dashboard/add-story", label: "Add Story", icon: <FaPlusCircle /> },
    { to: "/dashboard/join-guide", label: "Join as Tour Guide", icon: <RiGuideLine /> },
  ];

  return (
    <div className="bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
    <div className="flex max-w-[1440px] mx-auto shadow-xl h-screen bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] border-r border-[var(--color-border)] dark:border-[var(--color-border-dark)] p-6 transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <Link to={'/'}>
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl font-bold text-[var(--color-text-primary-two)]">Trip Hood</span>
        </div></Link>

        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center text-[var(--color-text-primary-two)] gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "hover:bg-[var(--color-secondary)] hover:text-white dark:hover:bg-[var(--color-secondary-dark)]"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span className="text-base font-medium">{link.label}</span>
            </NavLink>
          ))}

          <button
            className="flex items-center gap-3 px-3 py-2 mt-6 rounded-lg bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-[var(--color-text-primary-two)] hover:bg-red-600"
          >
            <FaSignOutAlt />
            <span className="text-base font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between lg:hidden px-4 py-4 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <span className="text-xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Trip Hood</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] text-2xl"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Dynamic Page Content */}
        <div  className="flex-1 relative px-4 py-6 md:px-8 lg:px-10 overflow-auto">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-4 py-6 text-center text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          &copy; {new Date().getFullYear()} Trip Hood — All rights reserved.
        </footer>
      </div>
    </div>
    </div>
  );
};

export default DashboardLayout;
