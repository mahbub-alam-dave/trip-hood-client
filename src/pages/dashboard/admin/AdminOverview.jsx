import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import { ContextValues } from "../../../utility/contexts/ContextValue";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import { Link } from "react-router";
import AdminStats from "../common/AdminStats";
import Loading from "../../../components/sharedComponents/Loading";
import { Home, Package, Users } from "lucide-react";
import { motion } from "framer-motion";
import { User, CalendarDays, Bell } from "lucide-react";


Modal.setAppElement("#root");

  const cards = [
    {
      title: "Home",
      description: "Go back to the main dashboard",
      icon: <Home className="w-8 h-8 text-blue-500" />,
      path: "/",
    },
    {
      title: "Packages",
      description: "Explore curated travel packages",
      icon: <Package className="w-8 h-8 text-green-500" />,
      path: "/trips",
    },
    {
      title: "Community",
      description: "Connect with fellow travelers",
      icon: <Users className="w-8 h-8 text-purple-500" />,
      path: "/community",
    },
  ];

const AdminOverview = () => {

    const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const { user } = useContext(ContextValues)
  const axiosSecure = useAxiosSecure()


//   fetch user data
const { data: userData = {}, isLoading, } = useQuery({
  queryKey: ["user-data", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/by-email/${user.email}`);
    return res.data;
  },
  enabled: !!user?.email,
});


  if(isLoading) return <Loading />

  return (
    <div className="mt-4">

<motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between"
    >
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <div className="bg-white/20 p-4 rounded-full">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {user.name} 👋</h2>
          <p className="text-sm text-white/80">
            Here's a quick look at your dashboard today.
          </p>
        </div>
      </div>

      {/* Right side icons */}
      <div className="flex space-x-4 mt-4 md:mt-0">
        <div className="flex items-center bg-white/20 px-4 py-2 rounded-xl space-x-2">
          <CalendarDays className="w-5 h-5" />
          <span className="text-sm">{today}</span>
        </div>
        <div className="flex items-center bg-white/20 px-4 py-2 rounded-xl space-x-2 cursor-pointer hover:bg-white/30 transition">
          <Bell className="w-5 h-5" />
          <span className="text-sm">Notifications</span>
        </div>
      </div>
    </motion.section>




      {
        userData.role === "admin" &&
        <AdminStats />
      }
       <section className="pt-8">
      <h2 className="text-2xl font-semibold mb-6">Quick Navigation</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 ">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <Link to={card.path} className="flex flex-col items-center text-center space-y-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full">
                {card.icon}
              </div>
              <h3 className="text-lg font-medium">{card.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                {card.description}
              </p>
            </Link>
          </motion.div>

        ))}
      </div>
      </section>
    </div>
  );
};

export default AdminOverview;
