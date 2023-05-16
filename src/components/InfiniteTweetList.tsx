import React from "react";

type Twiit = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  twiits?: Twiit[];
  fetchNewTwiits: () => Promise<unknown>;
};

const InfiniteTweetList = ({
  twiits,
  isError,
  isLoading,
  hasMore,
  fetchNewTwiits,
}: InfiniteTweetListProps) => {
  return <div>InfiniteTweetList</div>;
};

export default InfiniteTweetList;
