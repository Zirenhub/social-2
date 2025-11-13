"use client";
import { useState } from "react";
import Image from "next/image";

import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

// TODO: Replace with actual tRPC types from your schema
interface PostProps {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt: Date;
}

export function Post({
  id,
  author,
  content,
  images,
  likes,
  comments,
  isLiked = false,
  isBookmarked = false,
  createdAt,
}: PostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  // TODO: Integrate with tRPC mutation for like/unlike
  // const likeMutation = api.post.like.useMutation({
  //   onSuccess: () => {
  //     // Invalidate queries to refetch data
  //   },
  // });

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    // TODO: Call tRPC mutation
    // likeMutation.mutate({ postId: id });
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);

    // TODO: Call tRPC mutation for bookmark
    // bookmarkMutation.mutate({ postId: id });
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="border-border hover:border-primary/20 overflow-hidden transition-all">
      {/* Post Header */}
      <div className="flex items-start justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="ring-background hover:ring-primary/20 h-10 w-10 ring-2 transition-all">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="cursor-pointer text-sm font-semibold hover:underline">
              {author.name}
            </span>
            <span className="text-muted-foreground text-xs">
              @{author.username} · {formatTimeAgo(createdAt)}
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent h-8 w-8 transition-colors"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Follow @{author.username}</DropdownMenuItem>
            <DropdownMenuItem>Add to list</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Report post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>

      {/* Post Images */}
      {images && images.length > 0 && (
        <div
          className={`relative mx-4 mb-3 grid gap-2 overflow-hidden rounded-xl ${
            images.length === 1
              ? "grid-cols-1"
              : images.length === 2
                ? "grid-cols-2"
                : images.length === 3
                  ? "grid-cols-2"
                  : "grid-cols-2"
          }`}
        >
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden ${
                images.length === 3 && index === 0 ? "col-span-2" : ""
              } ${images.length === 1 ? "aspect-video" : "aspect-square"}`}
            >
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="border-border flex items-center justify-between border-t px-4 py-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 transition-colors ${
              liked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
            }`}
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 transition-all ${
                liked ? "fill-current" : ""
              }`}
            />
            <span className="text-xs font-medium">{likeCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2 transition-colors hover:text-blue-500"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs font-medium">{comments}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="transition-colors hover:text-green-500"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className={`transition-colors ${
            bookmarked
              ? "text-yellow-500 hover:text-yellow-600"
              : "hover:text-yellow-500"
          }`}
          onClick={handleBookmark}
        >
          <Bookmark
            className={`h-4 w-4 transition-all ${
              bookmarked ? "fill-current" : ""
            }`}
          />
        </Button>
      </div>
    </Card>
  );
}

// Example usage with mock data
export function PostExample() {
  const mockPost: PostProps = {
    id: "1",
    author: {
      id: "user1",
      name: "Jane Doe",
      username: "janedoe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    content:
      "Just launched my new project! 🚀 Built with the T3 Stack and loving every minute of it. The developer experience is incredible!",
    images: [
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800",
    ],
    likes: 124,
    comments: 23,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
  };

  return <Post {...mockPost} />;
}
