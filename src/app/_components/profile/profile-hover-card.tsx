import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { HoverCardContent } from "../ui/hover-card";

type Props = {
  profile?: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl: string | null;
    bio?: string | null;
    followers?: number;
    following?: number;
  };
  isLoading: boolean;
  onFollow?: () => void;
  isFollowing?: boolean;
};

function ProfileHoverCard({
  profile,
  isLoading,
  onFollow,
  isFollowing = false,
}: Props) {
  return (
    <HoverCardContent className="bg-popover border-border mt-2 w-72 rounded-lg border p-4 shadow-lg">
      {isLoading ? (
        <div className="text-muted-foreground text-sm">Loading...</div>
      ) : profile ? (
        <>
          <div className="mb-3 flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile.avatarUrl ?? undefined} />
              <AvatarFallback>{profile.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-muted-foreground text-xs">
                @{profile.username}
              </p>
            </div>
          </div>
          {profile.bio && (
            <p className="text-muted-foreground mb-3 line-clamp-3 text-sm">
              {profile.bio}
            </p>
          )}
          <div className="text-muted-foreground mb-3 flex gap-4 text-xs">
            <span>
              <strong className="text-foreground">{profile.followers}</strong>{" "}
              followers
            </span>
            <span>
              <strong className="text-foreground">{profile.following}</strong>{" "}
              following
            </span>
          </div>
          {onFollow && (
            <Button size="sm" className="w-full" onClick={onFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </>
      ) : null}
    </HoverCardContent>
  );
}

export default ProfileHoverCard;
