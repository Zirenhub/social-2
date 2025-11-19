import { Eye } from "lucide-react";

type Props = {
  views: number;
  comments: number;
  onCommentsClick?: () => void;
};

function PostStats({ views, comments, onCommentsClick }: Props) {
  return (
    <div className="text-muted-foreground border-border/40 flex items-center justify-between border-b px-4 py-2.5 text-xs sm:px-6">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5" />
          {views.toLocaleString()} views
        </span>
      </div>
      <button
        onClick={onCommentsClick}
        className="cursor-pointer hover:underline"
      >
        {comments} comments
      </button>
    </div>
  );
}

export default PostStats;
