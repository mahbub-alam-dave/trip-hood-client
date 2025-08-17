// ManageUsersPage.jsx
import { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import Pagination from "../../../components/sharedComponents/Pagination";
import NoData from "../../../components/sharedComponents/NoData";
import Loading from "../../../components/sharedComponents/Loading";


const rolesOptions = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "tour_guide", label: "Tour Guide" },
  { value: "tourist", label: "Tourist" },
];

const ManageUsersPage = () => {

    const axiosSecure = useAxiosSecure()


  const [searchText, setSearchText] = useState("");
const [roleFilter, setRoleFilter] = useState("all");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const { data = {}, isLoading } = useQuery({
  queryKey: ["users", searchText, roleFilter, currentPage],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users`, {
      params: {
        search: searchText,
        role: roleFilter,
        page: currentPage,
        limit: itemsPerPage
      }
    });
    return res.data;
  },
});

const users = data.users || [];
const totalUsers = data.total || 0;
const totalPages = Math.ceil(totalUsers / itemsPerPage);


  const isDarkMode = document.documentElement.classList.contains("dark");


const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: isDarkMode ? "transparent" : "#ffffff", // Tailwind: gray-800 or white
    color: isDarkMode ? "#F9FAFB" : "#111827", // text color
    borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB", // Tailwind blue-500 or gray-300
    // borderColor: isDarkMode ? "#364153" : "#e5e7eb", // Tailwind blue-500 or gray-300
    boxShadow: "none",
    "&:hover": {
      borderColor: "#3B82F6",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: isDarkMode ? "#F9FAFB" : "#111827", // text color
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
    color: isDarkMode ? "#F9FAFB" : "#111827",
    zIndex: 50,
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? "#3B82F6"
      : isFocused
      ? (isDarkMode ? "#374151" : "#E5E7EB")
      : "transparent",
    color: isSelected
      ? "#ffffff"
      : isDarkMode
      ? "#F9FAFB"
      : "#111827",
    cursor: "pointer",
  }),
};

    // if(!users || users.length === 0) {
    //   return <NoData message="No users found"/>
    // }

    console.log(roleFilter)

  return (
    <div className="">
      <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        Manage Users
      </h2>

      <div className="flex flex-col items-center md:flex-row gap-4 mb-6 ">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-4 rounded-lg h-[48px] w-1/2 md:w-1/3 focus-within:outline-none outline-none"
        />

{/*         <div className="w-full md:w-1/3 border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
        <Select
          options={rolesOptions}
          styles={customStyles}
          value={roleFilter}
          onChange={setRoleFilter}
          className="h-full border-none shadow-none"
        />
        </div> */}

        <select defaultValue="" onChange={(e) => setRoleFilter(e.target.value)} className="max-w-[155px] h-[48px] select bg-transparent border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] focus:outline-none ">
  <option value="all" className='bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)]'>All</option>
  <option value="admin" className='bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)]'>Admin</option>
  <option value="tourist" className='bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)]'>Tourists</option>
  <option value="tour_guide" className='bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)]'>Tour Guides</option>
</select>
        
      </div>

      <div className="overflow-x-auto min-h-[60vh]">
        {
          isLoading ? <Loading />
          :
        <div className="overflow-x-auto bg-[var--color-bg-primary] dark:bg-[var(--color-bg-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg">
        <table className="min-w-full table-auto text-left ">
          {/* bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] */}
          <thead className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] ">
            <tr className="text-left border-b  border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Joined</th>
            </tr>
          </thead>
          <tbody className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-8">Loading...</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-100 dark:hover:bg-gray-800  border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
        }
      </div>
    <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
    </div>
  );
};

export default ManageUsersPage;
