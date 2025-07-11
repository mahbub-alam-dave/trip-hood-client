import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../utility/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import { ContextValues } from "../../utility/contexts/ContextValue";
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCheck, FaTimes } from "react-icons/fa";
import PackageBooking from '../../components/forms/PackageBooking';



const PackageDetails = () => {

    const axiosSecure = useAxiosSecure()
    const {user} = useContext(ContextValues)
    const {id} = useParams()


    const fetchPackage = async () => {
        const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/packages/${id}`)
        return res.data
    }

    const {data: packageData = {}, isLoading, isError} = useQuery({
        queryKey: ["individual-tour-package", id],
        queryFn: fetchPackage
    })

    const {data: guides =[]} = useQuery({
      queryKey: ["guides-by-location", packageData?.destination],
      enabled: !!packageData?.destination,   
      queryFn: async () => {
        const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/guides/by-destination?destination=${packageData?.destination}`, )
        return res.data
      }
    })
    // console.log(guides)


    const {
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
    included,
    excluded,
    itinerary,
    groupSize,
  } = packageData;

      if (isLoading) return <div>Loading tour guides...</div>;
  if (isError) return <div>Error loading guides</div>;


    return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
      {/* Image Collage */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <img src={images[0]} className="col-span-2 row-span-2 rounded-xl h-80 w-full object-cover" />
        <img src={images[1]} className="col-span-1 row-span-2 rounded-xl h-80 w-full object-cover" />
        <img src={images[2]} className="col-span-1 row-span-2 rounded-xl h-80 w-full object-cover" />
        {/* <img src={images[1]} className="col-span-1 rounded-xl h-40 w-full object-cover" />
        <img src={images[2]} className="col-span-1 rounded-xl h-40 w-full object-cover" /> */}
      </div>

      {/* Title & Summary */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-2">{title}</h1>
        <span className="bg-[var(--color-primary)] text-[var(--color-text-primary-two)] text-xs font-semibold px-3 py-1 rounded-full">{type}</span>
        <div className="flex flex-wrap items-center text-sm gap-4 mt-4 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          <FaMapMarkerAlt /> {destination}
          <FaCalendarAlt /> {duration}
          <FaUsers /> Group: {groupSize}
          <FaStar className="text-yellow-500" /> {rating} ({reviews} reviews)
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">{description}</p>

      {/* Included / Excluded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div>
          <h3 className="text-lg font-bold mb-3">Included</h3>
          <ul className="space-y-2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            {included.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <FaCheck className="text-green-500" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Excluded</h3>
          <ul className="space-y-2 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            {excluded.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <FaTimes className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price */}
  <div className="flex items-end gap-2 mt-6">
    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Tour Price:</h3>
    <div className=" text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] text-2xl font-bold">
      {price} {currency}.
    </div>
    <h3 className="text-2xl text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">/</h3>
    <span className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] italic">Per person</span>
  </div>

      {/* Itinerary */}
      <div>
        <h3 className="text-lg font-bold mb-3">Day-wise Itinerary</h3>
        <div className="space-y-4">
          {itinerary.map((day, idx) => (
            <div key={idx} className=" border rounded-xl p-4 border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              <h4 className="font-semibold mb-2">{day.day}: </h4>
              <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">{day.plan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Guides */}
<div>
  <h3 className="text-lg font-bold mb-4 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
    Available Guides for {destination}
  </h3>

  {guides.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {guides.map((guide) => (
        <Link key={guide._id} to={`/guide/${guide._id}`}>
        <div
          className="bg-white dark:bg-[var(--color-bg-primary-dark)] rounded-xl shadow p-4 text-center"
        >
          <img
            src={guide.photo}
            alt={guide.name}
            className="w-24 h-24 rounded-full mx-auto object-cover mb-3 border-4 border-[var(--color-primary)]"
          />
          <h4 className="font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
            {guide.name}
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] line-clamp-2 text-center mx-auto max-w-[220px] w-full">
            {guide.expertise.map((ex, index) => (
    <span key={index}>
      {ex}
      {index < guide.expertise.length - 1 && ", "}
    </span>
  ))}
          </p>
        </div>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-[var(--color-text-secondary)]">No guides available for this destination.</p>
  )}
</div>


      {/* booking Form */}
      <PackageBooking packageData={packageData} guides={guides}/>

      </div>
    );
};

export default PackageDetails;