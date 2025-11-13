"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  ImageIcon,
  Smile,
  Send,
} from "lucide-react";

type Props = {
  onExpand?: () => void;
  alwaysExtended?: boolean;
};

function CreatePost({ onExpand, alwaysExtended = false }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(alwaysExtended);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleExpandClick = () => {
    if (onExpand) {
      onExpand();
    } else {
      setIsExpanded(true);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  };

  const handlePost = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setContent("");
    setIsExpanded(false);
    setIsLoading(false);
  };

  return (
    <motion.div animate={{ opacity: 1 }} className="w-full max-w-[550px]">
      {/* Main Input Area */}
      <motion.div layout>
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
                    className="space-y-4"
                  >
                    <Textarea
                      ref={textareaRef}
                      placeholder="What's on your mind?"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="focus-visible:ring-accent-foreground/30 border-border min-h-20 w-full resize-none focus-visible:ring-1"
                    />

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
                            whileHover={{ opacity: 0.7 }}
                            whileTap={{ scale: 0.95 }}
                            className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg p-2 transition-colors"
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
                          onClick={handlePost}
                          disabled={!content.trim() || isLoading}
                          size="sm"
                          className="flex-1 gap-2 sm:flex-none"
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                              className="border-background border-t-primary-foreground h-4 w-4 rounded-full border-2"
                            />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                          {isLoading ? "Posting..." : "Post"}
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {content && isExpanded && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-card mt-4 p-4"
          >
            <Card className="border-border shadow-sm">
              <CardContent className="px-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                  <div className="max-w-[450px] min-w-0 flex-1">
                    <p className="text-sm font-semibold">You</p>
                    <p className="text-muted-foreground mb-3 text-xs">
                      just now
                    </p>
                    <p className="text-foreground text-sm leading-relaxed wrap-break-word">
                      {content}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-border border-t">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-muted-foreground flex w-full flex-wrap gap-4 text-xs sm:gap-6"
                >
                  {[
                    { icon: Heart, label: "0" },
                    { icon: MessageCircle, label: "20" },
                    { icon: Share2, label: "Share" },
                  ].map((action) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hover:text-foreground group flex items-center gap-2 transition-colors"
                    >
                      <action.icon className="group-hover:bg-muted h-6 w-6 rounded-full p-1" />
                      {action.label}
                    </motion.button>
                  ))}
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CreatePost;
