import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../utility/hooks/useAxiosSecure';
import TripPackageCard from '../../components/general/TripPackageCard';

const TripsPackage = () => {

    const axiosSecure = useAxiosSecure()

    const { data: packages = [], isLoading, isError } = useQuery({
    queryKey: ["all-packages"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/packages`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading packages...</div>;
  if (isError) return <div className="text-center text-[var(--color-accent)] dark:text-[var(--color-accent-two)] py-10">Failed to load packages.</div>;
      if(!packages || packages.length === 0) {
        return <NoData message="You haven't added any stories yet"/>
      }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-8">
        All Tour Packages
      </h1>

      <div className="space-y-8">
        {packages.map((trip) => (
          <TripPackageCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
    );
};

export default TripsPackage;