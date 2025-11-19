type Props = {
  content: string;
  className?: string;
};

function PostContent({ content, className }: Props) {
  return (
    <div className={`px-4 pb-3 sm:px-6 ${className ?? ""}`}>
      <p className="text-foreground/90 text-[15px] leading-relaxed break-words whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}

export default PostContent;
