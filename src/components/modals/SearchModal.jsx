import React from 'react';
import { useNavigate } from 'react-router';
import { FaTimes } from "react-icons/fa";

const SearchModal = ({setSearchTerm, setDebouncedTerm, isLoading, tourPackages}) => {
    const navigate = useNavigate()
    return (
        <div className="w-full max-w-[1280px] absolute top-[100%] mt-4 flex justify-center z-20 px-4 sm:px-6 lg:px-8 ">
          <div className="w-full h-full mx-auto bottom-0 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-2xl p-4 sm:p-6 lg:p-8 lg:pb-16 shadow-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] animate-slide-up space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-3 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Search Results</h2>
              <button
                onClick={() => {
                setSearchTerm("");
                setDebouncedTerm("");
                }}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                <FaTimes />
              </button>
            </div>

            {isLoading ? (
              <p className="text-center text-sm text-gray-400">Loading...</p>
            ) : tourPackages.length > 0 ? (
              tourPackages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="flex flex-col sm:flex-row gap-4 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg p-4"
                >
                  <img
                    src={pkg.images?.[0]}
                    alt={pkg.title}
                    className="w-full sm:w-1/3 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="text-start flex flex-col gap-2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                      <h3 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">{pkg.title}</h3>
                      <p className="text-base text-gray-500">{pkg.duration}</p>
                      <p className="text-base mt-1">{pkg.description}</p>
                      <p className="text-base font-bold mt-1 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
                        {pkg.price} {pkg.currency}
                      </p>
                    </div>
                    <button
                      className="mt-2 w-max px-4 py-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-md"
                      onClick={() => {
                        navigate(`/packages/${pkg._id}`);
                        setSearchTerm("");
                        setDebouncedTerm("");
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-400">No results found.</p>
            )}
          </div>
        </div>
    );
};

export default SearchModal;