import { useSession } from "next-auth/react";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

// update textarea height

function updateTextAreaHeight(textArea?: HTMLTextAreaElement) {
  if (!textArea) {
    return;
  }

  textArea.style.height = "0px";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const session = useSession();
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaHeight(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaHeight(textAreaRef.current);
  }, [inputValue]);

  return (
    <form className=" flex flex-col gap-2 border-b px-4 py-2">
      <div className=" flex gap-4">
        <ProfileImage src={session.data?.user.image || ""} className="" />
        <textarea
          ref={inputRef}
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

const NewTweetForm = () => {
  const session = useSession();

  if (session.status !== "authenticated") {
    return null;
  }

  return <Form />;
};

export default NewTweetForm;
