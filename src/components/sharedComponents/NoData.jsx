import { FaInbox } from "react-icons/fa";
import { PiEmpty } from "react-icons/pi";

const NoData = ({ message = "No Data Found", icon = <PiEmpty className="text-4xl text-gray-400" /> }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-gray-500 dark:text-gray-400">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full">
        {icon}
      </div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default NoData;
