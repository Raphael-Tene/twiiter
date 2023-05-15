import { useSession } from "next-auth/react";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import { useState } from "react";

// update textarea height

// todo: continue from here

// function updateTextAreaHeight(textArea?: HTMLTextAreaElement) {
//   if (!textArea) {
//     return;
//   }

//   textArea.style.height = "0px";
//   textArea.style.height = `${textArea.scrollHeight}px`;
// }

const NewTweetForm = () => {
  const [inputValue, setInputValue] = useState("");
  const session = useSession();

  //   if (session.status !== "authenticated") {
  //     return;
  //   }

  return (
    <form className=" flex flex-col gap-2 border-b px-4 py-2">
      <div className=" flex gap-4">
        <ProfileImage src={session.data?.user.image || ""} className="" />
        <textarea
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=" flex-grow resize-none overflow-hidden p-4 text-lg outline-none "
          placeholder="What's happening?"
        />
      </div>
      <Button className=" self-end ">Twiit</Button>
    </form>
  );
};

export default NewTweetForm;
