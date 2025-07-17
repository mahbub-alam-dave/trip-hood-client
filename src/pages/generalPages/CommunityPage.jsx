import { useQuery } from "@tanstack/react-query";

import { FacebookShareButton, FacebookIcon } from "react-share";
import { FaEye, FaCommentDots } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import useAxiosSecure from "../../utility/hooks/useAxiosSecure";
import ImageSlider from "../../components/sharedComponents/ImageSlider";
import Loading from "../../components/sharedComponents/Loading";

const CommunityPage = () => {

    const axiosSecure = useAxiosSecure()

  const { data: stories = [], isLoading, isError } = useQuery({
    queryKey: ["community-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load stories.</div>;

      if(!stories || stories.length === 0) {
      return <NoData message="You haven't added any stories yet"/>
    }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-12 text-center">
        📖 Traveler Stories from Our Community
      </h1>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <div
            key={story._id}
            className="rounded-xl overflow-hidden shadow-sm border border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:shadow-lg bg-white dark:bg-[var(--color-bg-primary-dark)] transition"
          >
{/*             <div className="h-56 w-full overflow-hidden">
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div> */}
              <div className="w-full h-56 overflow-hidden">
              <ImageSlider images={story.images} className="h-full" />
            </div>

            <div className="p-5 flex flex-col gap-3">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] leading-snug">
                {story.title}
              </h2>

              <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                {story.description.length > 110
                  ? `${story.description.slice(0, 110)}...`
                  : story.description}
              </p>

              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                <div className="flex items-center gap-1">
                  <IoLocationSharp className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
                  {story.location}
                </div>
                <div className="flex items-center gap-1">
                  <MdCategory className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
                  {story.category}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaEye /> {story.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCommentDots /> {story.comments}
                  </span>
                </div>

                <FacebookShareButton
                  url={window.location.href}
                  quote={`Check out "${story.title}" by ${story.author}`}
                  hashtag="#TripHood"
                >
                  <div className="flex items-center gap-2 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] cursor-pointer hover:underline">
                    <FacebookIcon size={30} round />
                    <span className="text-sm">{story.sharedCount}</span>
                  </div>
                </FacebookShareButton>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                📅 {new Date(story.date).toLocaleDateString()} by{" "}
                <span className="font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
                  {story.author}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
