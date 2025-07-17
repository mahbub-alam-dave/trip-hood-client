// src/components/shared/Loading.jsx

const Loading = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-10 ${className}`}>
      <span className="loading loading-spinner loading-lg text-primary mb-4" />
      <p className="text-gray-600 dark:text-gray-300 font-medium">{message}</p>
    </div>
  );
};

export default Loading;
