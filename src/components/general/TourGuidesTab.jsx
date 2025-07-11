import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";

// const fetchGuides = async () => {
//   const res = await axiosSecure.get("/guides");
//   const shuffled = res.data.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, 6);
// };




const TourGuidesTab = () => {

  const axiosSecure = useAxiosSecure()
  
  const fetchGuides = async () => {
    const res = await axiosSecure.get("/guides/random");
    return res.data;
  };

  const { data: guides = [], isLoading, isError } = useQuery({
    queryKey: ["tour-guides"],
    queryFn: fetchGuides,
  });

  console.log(guides)

  if (isLoading) return <div>Loading tour guides...</div>;
  if (isError) return <div>Error loading guides</div>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide, index) => (
        <motion.div
          key={guide._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-xl shadow-lg p-4 flex flex-col items-center text-center transition hover:scale-105"
        >
  <img 
    src={guide.photo} 
    alt={guide.name}
    className="w-28 h-28 object-cover rounded-full border-4 border-[var(--color-primary)] dark:border-[var(--color-primary-dark)] mb-3"
  />
  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">{guide.name}</h3>
  <p className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">{guide.coverageArea.join(", ")}</p>
  <div className="flex gap-2 max-w-[300px] w-full mt-2 flex-wrap justify-center items-center ">
    {guide.expertise.slice(0, 3).map((item, idx) => (
      <span key={idx} className="text-sm px-3 py-1 bg-transparent text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] rounded-full border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">{item}</span>
      // bg-[var(--color-accent)] dark:bg-[var(--color-secondary-dark)]
    ))}
  </div>
  <p className="text-xs text-gray-400 mt-2">⭐ {guide.rating} ({guide.reviews} reviews)</p>
  <Link to={`/guide/${guide._id}`}>
  <button className="mt-4 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] px-4 py-1 rounded-2xl text-base cursor-pointer">
    View Details
  </button>
  </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default TourGuidesTab;



