import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fetchGuides = async () => {
  const res = await axiosSecure.get("/guides");
  const shuffled = res.data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
};

const TourGuidesTab = () => {
  const { data: guides = [], isLoading, isError } = useQuery({
    queryKey: ["tour-guides"],
    queryFn: fetchGuides,
  });

  if (isLoading) return <div>Loading tour guides...</div>;
  if (isError) return <div>Error loading guides</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {guides.map((guide, index) => (
        <motion.div
          key={guide._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
        >
          <img
            src={guide.photo}
            alt={guide.name}
            className="h-48 w-full object-cover"
          />
          <div className="p-4 space-y-2">
            <h3 className="text-xl font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-two)]">
              {guide.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-300">
              {guide.expertise}
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-sm">
              Experience: {guide.experience}+ years
            </p>
            <Link
              to={`/guides/${guide._id}`}
              className="inline-block mt-2 px-4 py-2 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-white rounded hover:opacity-90 transition"
            >
              View Details
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TourGuidesTab;
