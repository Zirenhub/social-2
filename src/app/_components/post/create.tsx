"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  ImageIcon,
  Smile,
  Send,
} from "lucide-react";
import useCreatePost from "~/hooks/post/useCreatePost";
import { POST_MAX_CHARS } from "~/constants/post/post";

type Props = {
  onExpand?: () => void; // so this component can also be used as a button for example to open a modal intead of expanding
  alwaysExtended?: boolean;
};

function CreatePost({ onExpand, alwaysExtended = false }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(alwaysExtended);

  const {
    onSubmit,
    isSubmitting,
    register,
    watch,
    setFocus,
    formState: { errors },
  } = useCreatePost({
    onSuccessProp: (_data) => {
      if (!alwaysExtended) {
        setIsExpanded(false);
      }
    },
  });

  const handleExpandClick = () => {
    if (onExpand) {
      onExpand();
    } else {
      setIsExpanded(true);
      setTimeout(() => setFocus("content"), 0);
    }
  };

  const content = watch("content");

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="w-full max-w-[550px]"
      layout
    >
      {/* Main Input Area */}

      <Card className="border-border shadow-sm">
        <CardContent>
          <div className="flex items-start gap-3 sm:gap-4">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              {!isExpanded && (
                <motion.button
                  onClick={handleExpandClick}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-muted hover:bg-muted/80 w-full cursor-text rounded-lg px-4 py-3 text-left transition-all duration-200"
                >
                  <p className="text-muted-foreground text-sm">
                    Share your thoughts...
                  </p>
                </motion.button>
              )}

              {isExpanded && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                      {...register("content")}
                      maxLength={POST_MAX_CHARS}
                      placeholder="What's on your mind?"
                      className="focus-visible:ring-accent-foreground/30 border-border min-h-20 w-full resize-none focus-visible:ring-1"
                    />

                    {(errors.content ?? errors.root) && (
                      <p className="text-destructive mt-1 text-sm">
                        {errors.content?.message ?? errors.root?.message}
                      </p>
                    )}

                    <motion.div
                      layout
                      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex gap-2">
                        {[
                          { icon: ImageIcon, label: "Image" },
                          { icon: Smile, label: "Emoji" },
                        ].map((action) => (
                          <motion.button
                            key={action.label}
                            type="button"
                            whileHover={{ opacity: 0.7 }}
                            whileTap={{ scale: 0.95 }}
                            className="hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer rounded-lg p-2 transition-colors"
                            aria-label={action.label}
                          >
                            <action.icon className="h-5 w-5" />
                          </motion.button>
                        ))}
                      </div>

                      <div className="flex w-full gap-2 sm:w-auto">
                        {!alwaysExtended && (
                          <motion.button
                            onClick={() => setIsExpanded(false)}
                            className="text-foreground hover:bg-muted flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:flex-none"
                          >
                            Cancel
                          </motion.button>
                        )}

                        <Button
                          type="submit"
                          disabled={!content || isSubmitting}
                          size="sm"
                          className="flex-1 cursor-pointer gap-2 sm:flex-none"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                              className="border-background border-t-primary-foreground h-4 w-4 cursor-pointer rounded-full border-2"
                            />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                          {isSubmitting ? "Posting..." : "Post"}
                        </Button>
                      </div>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CreatePost;
