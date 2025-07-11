import { Link } from "react-router";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const TripPackageCard = ({ trip }) => {
  if (!trip) return null;

  const {
    _id,
    title,
    type,
    images,
    price,
    currency,
    destination,
    duration,
    description,
    rating,
    reviews,
  } = trip;

  return (
    <div className="flex flex-col md:flex-row border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-xl overflow-hidden shadow-sm dark:shadow-md bg-white dark:bg-[var(--color-bg-primary-dark)]">
      {/* Trip Image */}
      <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Trip Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        {/* Title & type */}
        <div>
          <h2 className="text-2xl font-bold mb-1 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
            {title}
          </h2>
          <p className="text-sm text-[var(--color-primary)] font-medium mb-2">{type}</p>
        </div>

        {/* Destination, duration */}
        <div className="flex flex-wrap gap-4 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-sm mb-3">
          <span className="flex items-center gap-1"><FaMapMarkerAlt /> {destination}</span>
          <span className="flex items-center gap-1"><FaClock /> {duration}</span>
        </div>

        {/* Description */}
        <p className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-4">
          {description.length > 110 ? description.slice(0, 110) + "..." : description}
        </p>

        {/* Rating and Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500 text-lg">
            <FaStar /> {rating}{" "}
            <span className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">({reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className=" md:text-right">
            <p className="text-xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
              {price} {currency}.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">per person</p>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-6">
          <Link
            to={`/packages/${_id}`}
            className="inline-block px-6 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-text-primary-two)] font-semibold hover:bg-[var(--color-primary-dark)] transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripPackageCard;
