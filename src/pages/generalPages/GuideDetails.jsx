import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const GuideDetails = () => {
 
    const {id} = useParams()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

     const { data: guide, isLoading, isError } = useQuery({
    queryKey: ["guide-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guides/${id}`);
      return res.data;
    },
    enabled: !!id, // prevent firing before param exists
  });

  if (isLoading) return <div className="text-center py-10">Loading guide details...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load guide.</div>;
 
 console.log(guide)
 
    if (!guide) return null;

  const {
    name,
    email,
    age,
    experience,
    language,
    nationalId,
    coverageArea,
    description,
    photo,
    rating,
    reviews,
    phone,
    expertise,
    status,
  } = guide;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        <img
          src={photo}
          alt={name}
          className="w-48 h-48 rounded-full object-cover border-4 border-[var(--color-primary)] dark:border-[var(--color-primary-dark)] shadow-lg"
        />

        <div className="flex-1 space-y-3 md:text-left">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">{name}</h2>

          <div className="flex flex-wrap gap-3 items-center text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            <span><FaMapMarkerAlt className="inline mr-1" /> {coverageArea.join(", ")}</span>
            <span><FaPhone className="inline mr-1" /> {phone}</span>
            <span><FaEnvelope className="inline mr-1" /> {email}</span>
          </div>

          <div className="flex items-center gap-2 text-yellow-500 text-lg">
            <FaStar /> {rating} <span className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">({reviews} reviews)</span>
            {status === "active" && (
              <span className="flex items-center text-green-500 text-sm font-semibold">
                <FaCheckCircle className="mr-1" /> Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] leading-relaxed">
        {description}
      </p>

      {/* Expertise */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Expertise</h3>
        <div className="flex flex-wrap gap-3">
          {expertise.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Coverage Area */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Coverage Areas</h3>
        <div className="flex flex-wrap gap-3">
          {coverageArea.map((area, index) => (
            <span
              key={index}
              className="px-3 py-1 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] rounded-full text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Languages Spoken</h3>
        <div className="flex flex-wrap gap-3">
          {language.map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 border border-[var(--color-border)] dark:border-[var(--color-border-dark)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] rounded-full text-sm"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Identity */}
      <div className="pt-6 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
        <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">National ID: {nationalId}</p>
        <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Age: {age} years | Experience: {experience}+ years</p>
      </div>

      {/* Back to guides */}
      <div className="pt-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-dark)] transition"
        >
          Back to All Guides
        </button>
      </div>
    </div>
  );
};

export default GuideDetails;
