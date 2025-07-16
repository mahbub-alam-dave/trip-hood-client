import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaBars, FaTimes, FaUserCircle, FaBookmark, FaPlusCircle, FaMapMarkedAlt, FaUserEdit, FaSignOutAlt, FaRegAddressCard } from "react-icons/fa";
import { RiSuitcaseLine, RiUserSettingsLine, RiUserSearchLine } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { RiGuideLine } from "react-icons/ri";
import Footer from "../components/sharedComponents/Footer";
import useUserRole from "../utility/hooks/useUserRole";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {role, roleLoading} = useUserRole()

  const navLinks = [
    { to: "/dashboard/profile", label: "Manage Profile", icon: <FaUserCircle /> },
    { to: "/dashboard/add-story", label: "Add Story", icon: <FaPlusCircle /> },
    { to: "/dashboard/manage-stories", label: "Manage Stories", icon: <FaBookOpen /> },
  ];

  const touristLinks = [
        { to: "/dashboard/my-bookings", label: "My Bookings", icon: <FaBookmark /> },
        { to: "/dashboard/join-as-guide", label: "Join as Tour Guide", icon: <FaRegAddressCard /> },
  ];

  const guidesLinks = [
      { to: "/dashboard/my-assigned-tours", label: "My Assigned Tours", icon: <FaMapMarkedAlt /> },
  ];

  const AdminLinks =[
    {
    to: "/dashboard/add-tour-package",
    label: "Add A Package",
    icon: <RiSuitcaseLine />,   // 🧳 Perfect for tour/package context
  },
  {
    to: "/dashboard/manage-users",
    label: "Manage Users",
    icon: <RiUserSettingsLine />, // 👤⚙️ For user management
  },
  {
    to: "/dashboard/manage-candidates",
    label: "Manage Candidates",
    icon: <RiUserSearchLine />,  // 👤🔍 Ideal for candidate management
  },
  ]

  return (
    <div className="bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
    <div className="flex max-w-[1440px] mx-auto shadow shadow-gray-300 h-screen text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] border-r border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-6 py-8 transition-transform duration-300 z-50 ${
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
                    ? "bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary)]"
                    : ""
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span className="text-base font-medium">{link.label}</span>
            </NavLink>
          ))}

            {
            !roleLoading && role==="tour_guide" &&
            <>
            {guidesLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center text-[var(--color-text-primary-two)] gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary)]"
                    : ""
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span className="text-base font-medium">{link.label}</span>
            </NavLink>
          ))}</>
          }

          {
            !roleLoading && role==="admin" &&
            <>
            {AdminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center text-[var(--color-text-primary-two)] gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary)]"
                    : ""
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span className="text-base font-medium">{link.label}</span>
            </NavLink>
          ))}
          </>
          }


          {/* tourist links */}
          { !roleLoading && role==="tourist" && 
          <>
          {touristLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center text-[var(--color-text-primary-two)] gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary)]"
                    : ""
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span className="text-base font-medium">{link.label}</span>
            </NavLink>
          ))}
          </>
        }



          <button
            className="flex items-center gap-3 px-3 py-2 mt-6 rounded-lg bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-[var(--color-text-primary-two)] hover:bg-red-600"
          >
            <FaSignOutAlt />
            <span className="text-base font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto ">
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
        <div id="dashboard-content" className="flex-1 relative px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>

        {/* Footer */}
{/*         <footer className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-4 py-6 text-center text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          &copy; {new Date().getFullYear()} Trip Hood — All rights reserved.
        </footer> */}
        <Footer />
      </div>
    </div>
    </div>
  );
};

export default DashboardLayout;
