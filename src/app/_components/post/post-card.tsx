"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

function PostCard({
  id,
  author,
  content,
  timestamp,
  likes,
  comments,
  image,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm transition-shadow duration-300 hover:shadow-md">
        <CardContent className="py-0">
          <div className="mb-4 flex items-start gap-3 sm:gap-4">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={author.avatar || "/placeholder.svg"} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="text-foreground truncate text-sm font-semibold">
                    {author.name}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    @{author.handle}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:bg-muted text-muted-foreground hover:text-foreground flex-shrink-0 rounded-full p-1 transition-colors"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </motion.button>
              </div>
              <p className="text-muted-foreground text-xs">{timestamp}</p>
            </div>
          </div>

          <p className="text-foreground text-sm leading-relaxed break-words">
            {content}
          </p>

          {image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-muted mb-4 h-48 overflow-hidden rounded-lg sm:h-64"
            >
              <img
                src={image || "/placeholder.svg"}
                alt="Post"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="border-border border-t">
          <motion.div
            layout
            className="text-muted-foreground flex w-full items-center gap-4 text-xs sm:gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className="hover:text-foreground group flex items-center gap-2 transition-colors"
            >
              <motion.div
                animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
              </motion.div>
              <span className="text-xs">{likeCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-foreground group flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="text-muted-foreground group-hover:text-foreground h-4 w-4" />
              <span className="text-xs">{comments}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-foreground group ml-auto flex items-center gap-2 transition-colors"
            >
              <Share2 className="text-muted-foreground group-hover:text-foreground h-4 w-4" />
            </motion.button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default PostCard;
