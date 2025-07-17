import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { ContextValues } from "../../../utility/contexts/ContextValue";
import useAxiosSecure from "../../../utility/hooks/useAxiosSecure";
import NoData from "../../../components/sharedComponents/NoData";

const ManageStories = () => {
  const { user } = useContext(ContextValues);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()


  // Fetch stories for logged-in user
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["my-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/by-email/${user.email}`);
      return res.data;
    },
  });

  // Delete story mutation
  const deleteStoryMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/stories/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your story has been removed.", "success");
      queryClient.invalidateQueries(["my-stories"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This story will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStoryMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading your stories...</p>;

    if(!stories || stories.length === 0) {
      return <NoData message="You haven't added any stories yet"/>
    }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold  mb-6">
        My Stories
      </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="rounded-lg overflow-hidden bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] transition shadow dark:shadow-gray-300"
            >
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
                  {story.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                  {story.location} • {story.date}
                </p>
                <div className="flex gap-4 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                  <span>⭐ {story.rating}</span>
                  <span>👁️ {story.views}</span>
                  <span>💬 {story.comments}</span>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <Link
                    to={`/dashboard/edit-story/${story._id}`}
                    className="flex items-center gap-1 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] hover:underline text-sm"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="flex items-center gap-1 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] hover:underline text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ManageStories;
