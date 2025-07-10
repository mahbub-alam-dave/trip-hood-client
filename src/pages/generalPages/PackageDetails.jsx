import React, { useContext } from 'react';
import useAxiosSecure from '../../utility/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { ContextValues } from "../../utility/contexts/ContextValue";


const PackageDetails = () => {

    const axiosSecure = useAxiosSecure()
    const {user} = useContext(ContextValues)
    const {id} = useParams()

    const fetchPackage = async () => {
        const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/packages/${id}`)
        return res.data
    }

    const {data: packageData = {}, isLoading, isError} = useQuery({
        queryKey: ["individual-tour-package"],
        queryFn: fetchPackage
    })

    const {data: guides =[]} = useQuery({
      queryKey: ["guides-by-location"],
      queryFn: async () => {
        const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/guides/by-destination?destination=${packageData?.destination}`, )
        return res.data
      }
    })
    console.log(guides)

//     const availableGuides = allGuides.filter(guide =>
//   guide.coverageArea.toLowerCase().includes(destination.toLowerCase())
// );

    // console.log(packageData)

    const {images, title, description, destination, price, duration, itinerary} = packageData

      if (isLoading) return <div>Loading tour guides...</div>;
  if (isError) return <div>Error loading guides</div>;


    return (
        <div className=' max-w-7xl mx-auto'>
    <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden ">
  <img src={images[0]} className="w-full h-64 object-cover  col-span-2 rounded-bl-lg rounded-br-lg" alt="" />
  <img src={images[1]} className="w-full h-36 object-cover rounded-lg" alt="" />
  <img src={images[2]} className="w-full h-36 object-cover rounded-lg" alt="" />
  {/* <img src={images[3]} className="w-full h-36 object-cover rounded-lg" alt="" /> */}
</div>

<div>
    <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{title}</h1>
<p className="text-[var(--color-text-primary)] mb-3">{description}</p>
<p className="text-[var(--color-text-secondary)]">Destination: {destination}</p>
<p className="text-[var(--color-text-secondary)]">Price: ${price}</p>
<p className="text-[var(--color-text-secondary)]">Duration: {duration} days</p>
</div>

<div className="my-6">
  <h2 className="text-2xl font-bold mb-4">Tour Plan</h2>
  <ul className="space-y-3">
    {itinerary.map((day, idx) => (
      <li key={idx} className="p-4 bg-gray-100 dark:bg-[var(--color-bg-primary-dark)] rounded-lg shadow-sm">
        <h3 className="font-semibold mb-1">Day {day.day}:</h3>
        <p>{day.plan}</p>
      </li>
    ))}
  </ul>
</div>

{/* <div className="grid md:grid-cols-3 gap-4 my-6">
  {availableGuides.map(guide => (
    <div key={guide._id} onClick={() => navigate(`/guides/${guide._id}`)} className="cursor-pointer group p-4 bg-white dark:bg-[var(--color-bg-primary-dark)] border rounded-lg shadow hover:shadow-lg transition">
      <img src={guide.photo} alt="" className="h-28 w-28 rounded-full object-cover mx-auto mb-3" />
      <h4 className="text-lg font-bold text-center group-hover:text-[var(--color-primary)]">{guide.name}</h4>
      <p className="text-xs text-center text-gray-500">{guide.expertise}</p>
    </div>
  ))}
</div> */}
    </div>
    );
};

export default PackageDetails;