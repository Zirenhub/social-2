import { toast } from "react-toastify";
import { api } from "~/trpc/react";

type Props = {
  postId: string;
};

export function usePostActions({ postId }: Props) {
  const utils = api.useUtils();

  const toggleLike = api.post.mutations.toggleLike.useMutation({
    onSuccess: () => {
      // This invalidates ALL getInfinitePosts queries regardless of filters
      // But only refetches the ones currently mounted/visible
      void utils.post.queries.getInfinitePosts.invalidate();
    },
    onError: () => {
      toast.error("Failed to like post");
    },
  });

  const toggleBookmark = api.post.mutations.toggleBookmark.useMutation({
    onSuccess: (data) => {
      void utils.post.queries.getInfinitePosts.invalidate();
      toast.success(data.isBookmarked ? "Post saved" : "Post removed");
    },
    onError: () => {
      toast.error("Failed to bookmark post");
    },
  });

  const deletePost = api.post.mutations.delete.useMutation({
    onSuccess: () => {
      void utils.post.queries.getInfinitePosts.invalidate();
      toast.success("Post deleted");
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  return {
    toggleLike: () => toggleLike.mutate({ postId }),
    toggleBookmark: () => toggleBookmark.mutate({ postId }),
    deletePost: () => deletePost.mutate({ postId }),
    isLikePending: toggleLike.isPending,
    isBookmarkPending: toggleBookmark.isPending,
    isDeletePending: deletePost.isPending,
  };
}
