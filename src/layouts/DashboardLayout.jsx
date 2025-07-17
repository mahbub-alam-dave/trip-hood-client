import { useContext, useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { FaBars, FaTimes, FaUserCircle, FaBookmark, FaBookOpen, FaPlusCircle, FaMapMarkedAlt, FaUserEdit, FaSignOutAlt, FaRegAddressCard } from "react-icons/fa";
import { RiSuitcaseLine, RiUserSettingsLine, RiUserSearchLine } from "react-icons/ri";
// import your logos and nav links here
import logoDark from "../assets/logoDark.png";
import logoLight from "../assets/logoLight.png";
import {ContextValues} from "../utility/contexts/ContextValue"
import useUserRole from "../utility/hooks/useUserRole"
import useThemeMode from "../utility/hooks/useThemeMode"
import Footer from "../components/sharedComponents/Footer"




const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {role, roleLoading} = useUserRole()
  const {signOutUser} = useContext(ContextValues)
  const theme = useThemeMode()

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


  const handleLogout = () => {
    signOutUser()
    .then(() =>{
      // logged out successfully
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
      <div className="flex justify-center">
        {/* Wrapper with max width (entire dashboard incl. sidebar) */}
        <div className="flex w-full ">
          
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-82 z-50 p-8 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] border-r border-[var(--color-border)] dark:border-[var(--color-border-dark)] transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 `}
          >
            <Link to={'/'}>
              <div className="flex items-center gap-3 mb-8">
                <img src={logoDark} alt="Trip Hood" />
                <span className="text-2xl font-bold text-[var(--color-text-primary-two)]">Trip Hood</span>
              </div>
            </Link>

            <nav className="flex flex-col gap-6">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition text-[var(--color-text-primary-two)] ${
                      isActive ? "bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary)]" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.icon}
                  <span className="text-base font-medium">{link.label}</span>
                </NavLink>
              ))}

              {!roleLoading && role === "tour_guide" && guidesLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition text-[var(--color-text-primary-two)] ${
                      isActive ? "bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary)]" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.icon}
                  <span className="text-base font-medium">{link.label}</span>
                </NavLink>
              ))}

              {!roleLoading && role === "admin" && AdminLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition text-[var(--color-text-primary-two)] ${
                      isActive ? "bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary)]" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.icon}
                  <span className="text-base font-medium">{link.label}</span>
                </NavLink>
              ))}

              {!roleLoading && role === "tourist" && touristLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition text-[var(--color-text-primary-two)] ${
                      isActive ? "bg-[var(--color-primary-dark)] dark:bg-[var(--color-primary)]" : ""
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.icon}
                  <span className="text-base font-medium">{link.label}</span>
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 mt-6 rounded-lg bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-[var(--color-text-primary-two)] hover:bg-red-600"
              >
                <FaSignOutAlt />
                <span className="text-base font-medium">Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
            {/* Topbar - Only visible on mobile */}
            <div className="lg:hidden flex items-center justify-between px-4 py-6 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              <Link to={'/'}>
                <div className="flex items-center gap-2">
                  <img src={theme === "dark" ? logoDark : logoLight} className="w-8 h-8" alt="Logo" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Trip Hood</span>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] text-2xl"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Page Content */}
            <div className="flex-1 lg:ml-82 overflow-y-auto ">
              <div className="px-4 sm:px-6 lg:px-8 pt-8 min-h-[60vh]">
                <Outlet />
              </div>
            {/* Footer */}
            <div className="">
              <Footer location="dashboard"/>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
