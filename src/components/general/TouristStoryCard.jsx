import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router";
import { FaShareAlt } from "react-icons/fa";
import { useContext } from "react";
import { ContextValues } from "../../utility/contexts/ContextValue";

const TouristStoryCard = ({ story }) => {
  const { user } = useContext(ContextValues);
  const navigate = useNavigate();

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <div className="bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-xl overflow-hidden shadow-lg flex flex-col transition hover:scale-105">
      <img
        src={story.images[0]}
        alt={story.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">
          {story.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          by {story.author} • {story.date}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] line-clamp-3 flex-grow">
          {story.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          {user ? (
            <FacebookShareButton
              url={`https://tourhood.com/stories/${story._id}`}
              quote={story.title}
              hashtag="#TourHood"
            >
              <FacebookIcon size={28} round />
            </FacebookShareButton>
          ) : (
            <button
              onClick={handleShare}
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              <FaShareAlt size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TouristStoryCard;
