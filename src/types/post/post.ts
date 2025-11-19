import z from "zod";
import { POST_MAX_CHARS } from "~/constants/post/post";
import type { RouterOutputs } from "~/trpc/react";

export const PostZ = z.object({
  content: z
    .string({ message: "Post content must be included." })
    .trim()
    .min(1, `Post can't be fewer than 1 character`)
    .max(
      POST_MAX_CHARS,
      `Post can't be longer than ${POST_MAX_CHARS} characters.`,
    ),
});

export type PostData = z.infer<typeof PostZ>;
export type PostQueryType =
  RouterOutputs["post"]["queries"]["getInfinitePosts"]["posts"][0];
export type PostProfileType = PostQueryType["profile"];
