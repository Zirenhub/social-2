import { Item, ItemContent, ItemMedia, ItemTitle } from "~/components/ui/item";
import { Spinner } from "~/components/ui/spinner";
import { cn } from "~/lib/utils";

type Props = {
  content?: string;
};

function CustomSpinner({ content }: Props) {
  return (
    <div
      className={cn(
        "flex w-full max-w-xs flex-col gap-4 [--radius:1rem]",
        content && "items-center",
      )}
    >
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        {/* {content && (
          <ItemContent>
            <ItemTitle className="line-clamp-1">{content}</ItemTitle>
          </ItemContent>
        )} */}
        {content && (
          <ItemContent className="flex-none justify-end">
            <span className="text-sm tabular-nums">{content}</span>
          </ItemContent>
        )}
      </Item>
    </div>
  );
}

export default CustomSpinner;
