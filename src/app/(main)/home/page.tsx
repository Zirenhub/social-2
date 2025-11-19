import { Feed } from "~/components/feed/feed";
import CreatePost from "~/components/post/create";

function HomePage() {
  return (
    <div className="flex flex-col items-center gap-3 overflow-auto px-6 pt-3">
      <CreatePost alwaysExtended />
      <Feed />
    </div>
  );
}

export default HomePage;
