import { useState, useRef, useContext } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { TbBrandTwitch } from "react-icons/tb";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure"
import { useQuery } from '@tanstack/react-query';
import SearchModal from "../modals/SearchModal";
import { ContextValues } from "../../utility/contexts/ContextValue";
import PlanTourModal from "../modals/PlanTourModal";

const DestinationSearch = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const [debouncedTerm, setDebouncedTerm] = useState("");
const axiosSecure = useAxiosSecure()
const inputTimeout = useRef(null);

// plan tour
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(ContextValues);

  // Debounce searchTerm into debouncedTerm
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    clearTimeout(inputTimeout.current);
    inputTimeout.current = setTimeout(() => {
      setDebouncedTerm(value.trim());
    }, 400);
  };


/*   const filteredPackages = mockPackages.filter((pkg) =>
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  ); */

  // Show modal if input has text
/*   useEffect(() => {
    setShowModal(searchTerm.trim() !== "");
  }, [searchTerm]); */

    const {
    data: tourPackages = [],
    isLoading,
  } = useQuery({
    queryKey: ['searchTourPackages', debouncedTerm],
    queryFn: async () => {
      if (!debouncedTerm) return [];
      const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/search-package?destination=${debouncedTerm}`);
      return res.data;
    },
    enabled: !!debouncedTerm, // only run when input is not empty
  });

  const showModal = debouncedTerm.length > 0;

  // plan custom tour
    const handlePlanTourClick = () => {
    if (user) {
      setModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className=" flex w-full flex-col justify-center items-center " ref={containerRef}>
      {/* Search Input */}
{/*       <div className="relative max-w-96 w-full sm:w-64 md:w-84 z-10">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-primary-two)]">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search Destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 w-full rounded-lg text-[var(--color-text-primary-two)] bg-transparent border border-[var(--color-border)] focus:outline-none"
        />
      </div> */}
      <div className="flex flex-col gap-4 ">
      {/* Input Field */}
      <div className="flex flex-col sm:flex-row justify-center w-full items-center gap-4 mt-2">
      <div className="relative max-w-96 w-full sm:w-64 md:w-84">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-primary-two)]">
        <FaSearch />
      </span>
      <input
        type="text"
        value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
        onChange={handleInputChange}
        placeholder="Search your destination..."
        className="pl-10 pr-4 py-3 w-full rounded-lg text-[var(--color-text-primary-two)] bg-transparent border border-[var(--color-border)] focus:outline-none"
      />
    </div>
          {/* <DestinationSearch /> */}
                <button 
                onClick={handlePlanTourClick}
                className="flex items-center h-[52px] gap-2 px-6 py-3 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] font-semibold rounded-lg hover:opacity-90 transition border border-[var(--color-border)]">
                  <TbBrandTwitch size={24}/>
                  {/* bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] */}
                  Plan Tour
                </button>
              </div>
      
              {/* View Packages Button */}
              <Link to="/trips"
              ><span className="pt-12 text-sm text-[var(--color-text-primary-two)]  link">
                View Tour Packages
              </span>
              </Link>
              </div>

      {/* Absolute Modal Below */}
      {showModal && (
        <SearchModal setSearchTerm={setSearchTerm} setDebouncedTerm={setDebouncedTerm} isLoading={isLoading} tourPackages={tourPackages} />
      )}

      {isModalOpen && (
        <PlanTourModal   isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        user={user}/>
      )}

    </div>
  );
};

export default DestinationSearch;
