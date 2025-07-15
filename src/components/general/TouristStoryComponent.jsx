import TouristStoryCard from "./TouristStoryCard";
// import { useEffect, useState } from "react";
import { Link } from "react-router";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";

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
    const res = await axiosSecure.get('/stories/random')
    return res.data
  }

  const {data: stories = [], isLoading, isError} = useQuery({
    queryKey: ["tourist-stories"],
    queryFn: fetchStories
  })


if (isLoading) return <div>Loading tour guides...</div>;
  if (isError) return <div>Error loading guides</div>;

  return (
    <section className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Traveler Stories
      </h2>
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
  );
};

export default TouristStoryComponent;


