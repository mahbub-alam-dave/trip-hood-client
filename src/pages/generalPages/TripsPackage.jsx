import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../utility/hooks/useAxiosSecure';
import TripPackageCard from '../../components/general/TripPackageCard';
import Loading from '../../components/sharedComponents/Loading';
import NoData from '../../components/sharedComponents/NoData'
import { ContextValues } from '../../utility/contexts/ContextValue';
import PaginationTwo from '../../components/sharedComponents/PaginationTwo';



const TripsPackage = () => {

    const axiosSecure = useAxiosSecure()
    const {loading} = useContext(ContextValues)
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

    const params = {
      page, limit
    }

    const { data, isLoading, isError } = useQuery({
    queryKey: ["all-packages", {page, limit}],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/packages`, {params});
      return res.data;
    },
  });

  if (isLoading || loading) return <Loading />
  if (isError) return <div className="text-center text-[var(--color-accent)] dark:text-[var(--color-accent-two)] py-10">Failed to load packages.</div>;
      if(!data.packages || data.packages.length === 0) {
        return <NoData message="You haven't added any stories yet"/>
      }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className='space-y-4 mb-10'>
        <h1 className="text-2xl lg:text-3xl text-center font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] ">
        All Tour Packages
      </h1>
      <p className='text-center md:text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Here's all our opened packages. So, feel free to choose your own and confirm bookings.</p>
      </div>

      <div className="space-y-8">
        {data.packages.map((trip) => (
          <TripPackageCard key={trip._id} trip={trip} />
        ))}
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