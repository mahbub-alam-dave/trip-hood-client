import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import { TbBrandTwitch } from "react-icons/tb";
import DestinationSearch from "./DestinationSearch";


const Banner = () => {
  return (
    <div
      className="relative h-[78vh] w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/HL4mvxPJ/img-14.webp')",
        // https://i.ibb.co/4Z7cBDmb/pexels-asadphoto-1430677.jpg
        // https://i.ibb.co/HL4mvxPJ/img-14.webp
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
    <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-black via-black/60 to-black/70 opacity-80"></div>

      {/* Content */}
      <div className="relative text-center  w-full text-[var(--color-text-primary-two)]">
      <div className="relative  px-6 max-w-4xl mx-auto flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-[var(--color-primary-two)] drop-shadow-lg">
          Explore the World with Trip Hood
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-primary-two)] mb-8">
          “Adventure awaits — let your journey begin today.”
        </p>
      </div>
<DestinationSearch />
      </div>
    </div>
  );
};

export default Banner;
