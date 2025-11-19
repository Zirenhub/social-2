"use client";

import { motion } from "framer-motion";
import PostCard from "../post/post-card";
import { api } from "~/trpc/react";
import { useEffect, useRef } from "react";
import CustomSpinner from "../custom-spinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export function Feed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    api.post.queries.getInfinitePosts.useInfiniteQuery(
      { limit: 5, orderBy: "latest" },
      {
        getNextPageParam: (last) => last.nextCursor,
      },
    );
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0]?.isIntersecting;
      if (isIntersecting) void fetchNextPage();
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full flex-col items-center gap-4 sm:gap-6"
    >
      {isLoading && <CustomSpinner content="Loading posts..." />}
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}

      <div ref={loadMoreRef} className="h-10" />
      {isFetchingNextPage && <CustomSpinner content="Loading more..." />}
    </motion.div>
  );
}
