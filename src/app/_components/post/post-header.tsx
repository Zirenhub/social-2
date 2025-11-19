import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Trash2, Flag, UserMinus, Link as LinkIcon } from "lucide-react";
import type { PostProfileType } from "~/types/post/post";
import { HoverCard, HoverCardTrigger } from "~/components/ui/hover-card";
import ProfileHoverCard from "../profile/profile-hover-card";
import { formatDate } from "~/lib/utils";

type Props = {
  profile: PostProfileType;
  createdAt: Date;
  isOwnPost: boolean;
  onDelete: () => void;
  onCopyLink: () => void;
  onUnfollow?: () => void;
  onReport?: () => void;
};

function PostHeader({
  profile,
  createdAt,
  isOwnPost,
  onDelete,
  onCopyLink,
  onUnfollow,
  onReport,
}: Props) {
  return (
    <div className="px-4 pt-4 pb-3 sm:px-6 sm:pt-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar className="ring-background h-11 w-11 cursor-pointer shadow-sm ring-2">
                  <AvatarImage src={profile.avatarUrl ?? undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {profile.firstName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </HoverCardTrigger>

            <ProfileHoverCard profile={profile} isLoading={false} />
          </HoverCard>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="mb-0.5 flex items-center gap-1.5">
              <h3 className="text-foreground truncate text-sm font-semibold">
                {profile.firstName} {profile.lastName}
              </h3>
              {profile.isVerified && (
                <svg
                  className="text-primary h-4 w-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span className="truncate">@{profile.username}</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="flex-shrink-0">
                {formatDate({ date: createdAt })}
              </span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--muted))" }}
              whileTap={{ scale: 0.95 }}
              className="text-muted-foreground hover:text-foreground flex-shrink-0 cursor-pointer rounded-full p-1.5 transition-colors"
            >
              <MoreHorizontal className="h-4 w-4" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer" onClick={onCopyLink}>
              <LinkIcon className="mr-2 h-4 w-4" />
              Copy link
            </DropdownMenuItem>
            {isOwnPost ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete post
                </DropdownMenuItem>
              </>
            ) : (
              <>
                {onUnfollow && (
                  <DropdownMenuItem
                    onClick={onUnfollow}
                    className="cursor-pointer"
                  >
                    <UserMinus className="mr-2 h-4 w-4" />
                    Unfollow @{profile.username}
                  </DropdownMenuItem>
                )}
                {onReport && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={onReport}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Report post
                    </DropdownMenuItem>
                  </>
                )}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default PostHeader;
