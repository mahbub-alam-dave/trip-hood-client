import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";

// const fetchPackages = async () => {
//   const res = await axiosSecure.get("/packages");
//   const shuffled = res.data.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, 3);
// };


const TourPackagesTab = () => {

  const axiosSecure = useAxiosSecure()
  
  const fetchPackages = async () => {
    const res = await axiosSecure.get("/packages/random");
    return res.data;
  };

  const { data: packages = [], isLoading, isError } = useQuery({
    queryKey: ["tour-packages"],
    queryFn: fetchPackages,
  });

  console.log(packages)

  if (isLoading) return <div>Loading tour packages...</div>;
  if (isError) return <div>Error loading packages</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-lg overflow-hidden shadow-lg bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]"
        >
          <img
            src={pkg?.images[0]}
            alt={pkg.title}
            className="h-60 w-full object-cover"
          />
          <div className="p-4 space-y-2">
            <h3 className="line-clamp-1 text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
              {pkg.title}
            </h3>
            <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Type: {pkg.type}</p>
            <p className="font-bold">
              ${pkg.price}
            </p>
            <Link
              to={`/packages/${pkg._id}`}
              className="inline-block mt-2 px-4 py-2 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] rounded hover:opacity-90 transition"
            >
              View Details
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TourPackagesTab;
