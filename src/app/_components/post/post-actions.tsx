import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

type Props = {
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onComment: () => void;
  onBookmark: () => void;
  onShare: () => void;
  isLikePending?: boolean;
  isBookmarkPending?: boolean;
};

function PostActions({
  likes,
  comments,
  isLiked,
  isBookmarked,
  onLike,
  onComment,
  onBookmark,
  onShare,
  isLikePending = false,
  isBookmarkPending = false,
}: Props) {
  return (
    <div className="px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLike}
            disabled={isLikePending}
            className="group relative flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 transition-colors hover:bg-red-500/10 disabled:opacity-50"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLiked ? "liked" : "unliked"}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-200 ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground group-hover:text-red-500"
                  }`}
                />
              </motion.div>
            </AnimatePresence>
            <span
              className={`text-sm font-medium transition-colors ${
                isLiked
                  ? "text-red-500"
                  : "text-muted-foreground group-hover:text-red-500"
              }`}
            >
              {likes}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComment}
            className="group hover:bg-primary/10 flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 transition-colors"
          >
            <MessageCircle className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            <span className="text-muted-foreground group-hover:text-primary text-sm font-medium transition-colors">
              {comments}
            </span>
          </motion.button>
        </div>

        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookmark}
            disabled={isBookmarkPending}
            className="group hover:bg-primary/10 cursor-pointer rounded-full p-2 transition-colors disabled:opacity-50"
          >
            <Bookmark
              className={`h-5 w-5 transition-all duration-200 ${
                isBookmarked
                  ? "fill-primary text-primary"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            className="group hover:bg-primary/10 cursor-pointer rounded-full p-2 transition-colors"
          >
            <Share2 className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default PostActions;
