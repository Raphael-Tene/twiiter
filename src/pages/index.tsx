import NewTweetForm from "@/components/NewTweetForm";
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
    </>
  );
};

export default Home;
