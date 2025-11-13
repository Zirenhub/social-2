import { Feed } from "~/app/_components/feed/feed";
import CreatePost from "~/app/_components/post/create";

function HomePage() {
  return (
    <div className="p-3">
      <div className="flex min-h-screen flex-col items-center gap-3 px-6">
        <CreatePost alwaysExtended={true} />
        <Feed />
      </div>
    </div>
  );
}

export default HomePage;
