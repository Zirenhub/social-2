import { motion } from "framer-motion";

type Props = {
  imageUrls: string[];
  alt?: string;
};

function PostImage({ imageUrls, alt = "Post content" }: Props) {
  if (!imageUrls.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="bg-muted/30 group relative overflow-hidden"
    >
      <img
        src={imageUrls[0]}
        alt={alt}
        className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </motion.div>
  );
}

export default PostImage;
