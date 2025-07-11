import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

const DetailsPackageCard = ({ pkg }) => {
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
    groupSize,
  } = pkg;

  return (
    <div className="bg-white dark:bg-[var(--color-bg-primary-dark)] rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition hover:shadow-2xl">
      {/* Image Collage */}
      <div className="md:w-1/2 grid grid-cols-2 gap-1 p-2">
        <img
          src={images[0]}
          alt="Package"
          className="rounded-xl col-span-2 h-48 object-cover"
        />
        <img src={images[1]} alt="" className="rounded-xl h-24 object-cover" />
        <img src={images[2]} alt="" className="rounded-xl h-24 object-cover" />
      </div>

      {/* Package Info */}
      <div className="flex flex-col justify-between p-5 md:w-1/2">
        <div>
          <span className="bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
            {type}
          </span>

          <h2 className="text-xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-2">
            {title}
          </h2>

          <div className="flex items-center text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] gap-3 mb-3">
            <FaMapMarkerAlt /> {destination}
            <FaCalendarAlt /> {duration}
            <FaUsers /> Group: {groupSize}
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-4 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-[var(--color-primary)]">
              {currency} {price}
            </div>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <FaStar /> {rating} ({reviews} reviews)
            </div>
          </div>

          <Link
            to={`/packages/${_id}`}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPackageCard;
