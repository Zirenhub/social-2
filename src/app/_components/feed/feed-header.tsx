"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function FeedHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="mb-2 flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles className="text-primary h-6 w-6" />
        </motion.div>
        <h1 className="text-foreground text-3xl font-bold sm:text-4xl">Home</h1>
      </div>
      <p className="text-muted-foreground text-sm">
        See what&apos;s happening in your community
      </p>
    </motion.div>
  );
}
