import TouristStoryCard from "./TouristStoryCard";
// import { useEffect, useState } from "react";
import { Link } from "react-router";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";
import Loading from "../sharedComponents/Loading"

const TouristStoryComponent = () => {
//   const [stories, setStories] = useState([]);
  const axiosSecure = useAxiosSecure()

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/stories/random") // your API endpoint
//       .then((res) => setStories(res.data))
//       .catch((err) => console.log(err));
//   }, []);

  const fetchStories = async () => {
    const res = await axiosSecure.get(`/stories/random`)
    return res.data
  }

  const {data: stories = [], isLoading, isError} = useQuery({
    queryKey: ["tourist-stories"],
    queryFn: fetchStories
  })


if (isLoading) return <Loading />;
  // if (isError) return <div>Error loading guides</div>;
// #121212; #101828
  return (
    <div className='bg-gray-100 dark:bg-[#141414] py-20 my-16'>
    <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
      <div className="mb-12 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Traveler Stories
      </h2>
      <p className='text-center md:text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Stories that has been shared most recently by the advententures. We are waiting that your story also be featured here</p>
      </div>

      {/* Shared by Adventurers */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((story) => (
          <TouristStoryCard key={story._id} story={story} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/community"
          className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-two)] px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          View All Stories
        </Link>
      </div>
    </section>
    </div>
  );
};

export default TouristStoryComponent;


