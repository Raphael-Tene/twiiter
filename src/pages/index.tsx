import { InfiniteTweetList } from "@/components/InfiniteTweetList";
import NewTweetForm from "@/components/NewTwiitForm";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className=" mb-2 px-4 text-lg font-bold ">Home</h1>
      </header>
      {session.status === "authenticated" && (
        <div>
          <NewTweetForm />
        </div>
      )}
      <RecentTwiits />
    </>
  );
};

function RecentTwiits() {
  const twiits = api.twiit.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  return (
    <InfiniteTweetList
      twiits={twiits?.data?.pages.flatMap((page) => page.twiits)}
      isError={twiits.isError}
      isLoading={twiits.isLoading}
      hasMore={twiits?.hasNextPage}
      fetchNewTwiits={twiits.fetchNextPage}
    />
  );
}

export default Home;
