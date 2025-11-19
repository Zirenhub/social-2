"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";
import type { PostQueryType } from "~/types/post/post";
import { usePostActions } from "~/hooks/post/usePostActions";
import PostHeader from "./post-header";
import { toast } from "react-toastify";
import PostContent from "./post-content";
import PostImage from "./post-image";
import PostStats from "./post-stats";
import PostActions from "./post-actions";
import { useState } from "react";

function PostCard({
  id,
  content,
  profile,
  createdAt,
  isLiked,
  imageUrls,
  isOwner,
  views,
  likes,
  comments,
  isBookmarked,
}: PostQueryType) {
  // const [optimisticIsLiked, setOptimisticIsLiked] = useState(isLiked);

  const {
    toggleLike,
    toggleBookmark,
    deletePost,
    isLikePending,
    isBookmarkPending,
    isDeletePending,
  } = usePostActions({ postId: id });

  // const handleLike = () => {
  //   setOptimisticIsLiked(!optimisticIsLiked);
  //   toggleLike();
  // };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost();
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/post/${id}`);
    toast.success("Link copied to clipboard");
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto w-full max-w-2xl min-w-[240px]"
      >
        <Card className="border-border/40 bg-card/50 hover:border-border/60 hover:shadow-primary/5 overflow-hidden border py-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-0">
            <PostHeader
              profile={profile}
              createdAt={createdAt}
              isOwnPost={isOwner}
              onDelete={handleDelete}
              onCopyLink={handleCopyLink}
            />

            <PostContent content={content} />

            <PostImage imageUrls={imageUrls} />

            <PostStats
              views={views}
              comments={comments}
              onCommentsClick={() => {
                toast.info("Comments feature coming soon!");
              }}
            />

            <PostActions
              likes={likes}
              comments={comments}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              onLike={toggleLike}
              onComment={() => toast.info("Comments feature coming soon!")}
              onBookmark={toggleBookmark}
              onShare={handleCopyLink}
              isLikePending={isLikePending}
              isBookmarkPending={isBookmarkPending}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* <CommentSheet
        isOpen={isCommentSheetOpen}
        onClose={closeCommentSheet}
        comments={postComments}
        isLoading={isCommentsLoading}
        onSubmitComment={handleSubmitComment}
        isPending={isCommentPending}
      /> */}
    </>
  );
}

export default PostCard;
