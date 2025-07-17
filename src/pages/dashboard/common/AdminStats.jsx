import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaMoneyBill, FaUserTie, FaSuitcase, FaBookOpen } from "react-icons/fa";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const AdminStats = () => {

    const axiosSecure = useAxiosSecure()

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/stats`);
      return res.data;
    },
  });

  const stats = [
    {
      label: "Total Payment",
      value: data.totalPayments?.toLocaleString("en-BD") + " BDT",
      chartValue: data.totalPayments / 1000,
      icon: <FaMoneyBill className="text-green-600 text-2xl" />,
      bg: "bg-green-50",
      color: "#34D399"
    },
    {
      label: "Total Tour Guides",
      value: data.totalTourGuides,
      chartValue: data.totalTourGuides,
      icon: <FaUserTie className="text-blue-600 text-2xl" />,
      bg: "bg-blue-50",
      color: "#3B82F6",
    },
    {
      label: "Total Clients",
      value: data.totalTourists,
      chartValue: data.totalTourists,
      icon: <FaUsers className="text-purple-600 text-2xl" />,
      bg: "bg-purple-50",
      color: "#8B5CF6",
    },
    {
      label: "Total Packages",
      value: data.totalPackages,
      chartValue: data.totalPackages,
      icon: <FaSuitcase className="text-yellow-600 text-2xl" />,
      bg: "bg-yellow-50",
      color: "#FACC15",
    },
    {
      label: "Total Stories",
      value: data.totalStories,
      chartValue: data.totalStories,
      icon: <FaBookOpen className="text-pink-600 text-2xl" />,
      bg: "bg-pink-50",
      color: "#F472B6",
    },
  ];

  const chartData = stats.filter(stat => stat.label !== "Total Payment");


  if (isLoading) return <p className="text-center text-gray-500">Loading stats...</p>;

  return (
    <div className="space-y-6 my-8">
              <h3 className="text-2xl  mb-6 mt-12 font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] ">
          Stats and Overviews
        </h3>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className={`p-6 py-12 rounded-xl shadow-md ${item.bg} dark:bg-[var(--color-bg-primary-dark)] flex items-center gap-4 dark:border dark:border-[var(--color-border-dark)]`}
        >
          <div className="p-3 rounded-full bg-[var(--color-bg-primary)] dark:bg-gray-800 shadow">{item.icon}</div>
          <div>
            <h4 className="text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">{item.value}</h4>
            <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">{item.label}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Chart */}
        <h3 className="text-2xl mt-12 font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-6">
          Visual Overview
        </h3>
      <div className="p-5 rounded-xl shadow-md bg-white dark:bg-[var(--color-bg-primary-dark)] dark:border dark:border-[var(--color-border-dark)]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="label" stroke="#8884d8" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-primary)",
                borderRadius: "4px",
                border: "none",
                color: "#000",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="chartValue">
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminStats;
