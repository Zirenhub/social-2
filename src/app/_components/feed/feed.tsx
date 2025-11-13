"use client";

import { motion } from "framer-motion";
import PostCard from "../post/post-card";

const PLACEHOLDER_POSTS = [
  {
    id: "1",
    author: {
      name: "Alex Rivera",
      handle: "alexrivera",
      avatar: "/avatar-person-1.png",
    },
    content:
      "Just launched a new feature that makes sharing content so much smoother. The team put in incredible work on this! 🚀",
    timestamp: "2h ago",
    likes: 342,
    comments: 28,
    image: "/modern-workspace-technology.jpg",
  },
  {
    id: "2",
    author: {
      name: "Jordan Chen",
      handle: "jordanchen",
      avatar: "/avatar-person-2.png",
    },
    content:
      "Building in public is the best way to stay accountable. What are you working on today?",
    timestamp: "4h ago",
    likes: 1205,
    comments: 89,
  },
  {
    id: "3",
    author: {
      name: "Morgan Lee",
      handle: "morganlee",
      avatar: "/avatar-person-3.jpg",
    },
    content:
      "Design tip: Always think about micro-interactions. They're the details that make an app feel premium and responsive.",
    timestamp: "6h ago",
    likes: 892,
    comments: 45,
    image: "/minimal-design-ui-interface.jpg",
  },
  {
    id: "4",
    author: {
      name: "Casey Parker",
      handle: "caseyparker",
      avatar: "/avatar-person-4.jpg",
    },
    content:
      "Sometimes the best code is the code you don't write. Refactored 500 lines down to 50 today. Clean code feels good. ✨",
    timestamp: "8h ago",
    likes: 654,
    comments: 67,
  },
  {
    id: "5",
    author: {
      name: "Taylor White",
      handle: "taylorwhite",
      avatar: "/avatar-person-5.jpg",
    },
    content:
      "Just hit 100k users on the platform. A huge thank you to this amazing community. The journey is just getting started!",
    timestamp: "12h ago",
    likes: 3421,
    comments: 234,
    image: "/celebration-success-growth.jpg",
  },
];

export function Feed() {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6"
    >
      {PLACEHOLDER_POSTS.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </motion.div>
  );
}
