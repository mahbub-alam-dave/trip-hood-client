import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div
      className="relative h-[75vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/4Z7cBDmb/pexels-asadphoto-1430677.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>


    <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-black via-black/60 to-black/70 opacity-80"></div>

      {/* Content */}
      <div className="relative text-center text-[var(--color-text-primary-two)] px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-[var(--color-primary-two)] drop-shadow-lg">
          Explore the World with Trip Hood
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-primary-two)] mb-8">
          “Adventure awaits — let your journey begin today.”
        </p>

        {/* className="inline-block bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] dark:text-[var(--color-primary-two)] font-semibold rounded-lg hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] transition" */}

        {/* <hr className="max-w-2xl w-full bg-gray-800"/> */}
        {/* <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div> */}
        <div className="flex flex-col gap-4">
        {/* Input Field */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="px-4 py-3 max-w-96 w-full sm:w-64 md:w-84 rounded-lg focus:outline-none text-[var(--color-text-primary-two)] border border-[var(--color-border)] "
          />
          <button className="flex items-center h-[52px] gap-2 px-6 py-3 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] font-semibold rounded-lg hover:opacity-90 transition border border-[var(--color-border)] ">
            <FaSearch />
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

      </div>
    </div>
  );
};

export default Banner;
