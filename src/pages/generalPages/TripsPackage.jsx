import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../utility/hooks/useAxiosSecure';
import TripPackageCard from '../../components/general/TripPackageCard';
import Loading from '../../components/sharedComponents/Loading';
import NoData from '../../components/sharedComponents/NoData'
import { ContextValues } from '../../utility/contexts/ContextValue';
import PaginationTwo from '../../components/sharedComponents/PaginationTwo';
import { motion } from "framer-motion";
import { MdArrowDropDown } from "react-icons/md";



const TripsPackage = () => {

    const axiosSecure = useAxiosSecure()
    const {loading} = useContext(ContextValues)

      const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);


//     // Fetch function for TanStack Query
// const fetchAssignments = async ({ queryKey }) => {
//   const [_key, { page, limit, category, searchQuery }] = queryKey;
//   const params = {};
//   if(limit) params.limit = limit;
//   if(page) params.page = page;
//   if (category) params.category = category;
//   if (searchQuery.trim()) params.searchQuery = searchQuery.trim();
//   const { data } = await axiosSecure.get(`${API_URL}/assignments`, { params });
//   return data;
// };

 // Debounce search input
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 400); // wait 400ms after last keystroke
    return () => clearTimeout(delay);
  }, [searchInput]);

    const params = {
      page, limit, category, searchQuery
    }

    console.log(category)

    const { data, isLoading, isError } = useQuery({
    queryKey: ["all-packages", {page, limit, category, searchQuery}],
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/packages`, {params});
      return res.data;
      
    },
  });

  const packages = data?.packages

    const handleCategoryBtn = (cat) => {
    // setCategory(cat === "All" ? "" : cat)
    setCategory(cat)
    setPage(1)
  };

  // if (isLoading || loading) return <Loading />
/*   if (isError) return <div className="text-center text-[var(--color-accent)] dark:text-[var(--color-accent-two)] py-10">Failed to load packages.</div>;
      if(!data.packages || data.packages.length === 0) {
        return <NoData message="No packages to show"/>
      } */

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className='space-y-4 mb-10'>
        <h1 className="text-2xl lg:text-3xl text-center font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] ">
        All Tour Packages
      </h1>
      <p className='text-center md:text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Here's all our opened packages. So, feel free to choose your own and confirm bookings.</p>
      </div>

              <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-end items-center gap-3"
        >
          <label className="w-full text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] max-w-[180px] flex items-center gap-2 p-2 rounded bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus-within:outline-none focus-within:ring-0">
            <svg
              className="h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {setSearchInput(e.target.value) 
                                setPage(1)}}
              className="text-sm focus:outline-none focus:ring-0 focus:border-none "
              required
              placeholder="Search assignment..."
            />
          </label>

          <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn border-none m-1 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)]">Select <MdArrowDropDown size={26}/></div>
  <ul tabIndex={0} className="mt-4 dropdown-content menu bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] rounded-box z-1 w-42 p-2 shadow-sm dark:shadow-gray-400">
    <li className=' hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-text-primary-two)]' onClick={() => handleCategoryBtn("All")}><a>All</a></li>
    <li className=' hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-text-primary-two)]' onClick={() => handleCategoryBtn("Adventure")}><a>Adventure</a></li>
    <li className=' hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-text-primary-two)]' onClick={() => handleCategoryBtn("Relaxation & Family")}><a>Relaxation & Family</a></li>
    <li className=' hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-text-primary-two)]' onClick={() => handleCategoryBtn("Adventure & Hills")}><a>Adventure & Hills</a></li>
    <li className=' hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-text-primary-two)]' onClick={() => handleCategoryBtn("Nature & Culture")}><a>Nature & Culture</a></li>
  </ul>
</div>

{/* <select defaultValue="" onChange={(e) => setCategory(e.target.value)} className="max-w-[85px] select bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] focus:outline-none ">
  <option className='bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)]'>All</option>
  <option className='bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)]'>Relaxation & Family</option>
  <option className='bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)]'>Adventure & Hills</option>
  <option className='bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)]'>Nature & Culture</option>
</select> */}

{/*           <div className="flex gap-3 flex-wrap mt-3">
            {["All", "Adventure", "Relaxation & Family", "Adventure & Hills", "Nature & Culture"].map((cat) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => {handleCategoryBtn(cat) 
                  setPage(1)}}
                className={`${
                  category === cat 
                    ? "bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)]"
                    : "bg-transparent"
                } px-[12px] py-[6px] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-sm`}
              >
                {cat}
              </motion.button>
            ))}
          </div> */}
          {/* <div className="absolute hidden lg:block lg:h-screen inset-0 pointer-events-none opacity-40">
            <Lottie animationData={Bubbles} loop={true} />
          </div> */}
        </motion.div>

      <div className="">
        {loading || isLoading ? <Loading />
        : packages?.length === 0 ? 
         <NoData message="No packages to show"/>
        :
        <div className='space-y-8'>
        {packages?.map((trip) => (
          <TripPackageCard key={trip._id} trip={trip} />
        ))}
        </div>
        }
      </div>

      {/* pagination */}
       <div className="mt-12 flex flex-col gap-4 sm:flex-row justify-between items-center">
      {/* Page Size Selector */}
      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border cursor-pointer select border-[var(--color-border)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] max-w-[150px] focus:outline-none bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)]">
        {[5, 10, 15].map((n) => (
          <option key={n} value={n}>
            {n} per page
          </option>
        ))}
      </select>

      {/* Pagination */}
        <PaginationTwo
        totalPages={data?.totalPages}
        currentPage={data?.currentPage}
        onPageChange={setPage}
      />
      </div>
    </div>
    );
};

export default TripsPackage;