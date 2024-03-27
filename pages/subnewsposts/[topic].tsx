import Avatar from "@/components/Avatar";
import Feed from "@/components/Feed";
import PostBox from "@/components/PostBox";
import { useRouter } from "next/router";
import React from "react";

function Subnewsposts() {
  const {
    query: { topic },
  } = useRouter();

  return (
    <div className={`h-24 bg-red-400 p-8`}>
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3 pt-5">
          <div className="-mt-5">
            <Avatar seed={topic as string} large />
          </div>
          <div className="text-black py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subposts
            </h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-5xl pb-10">
        <PostBox subnewsposts={topic as string} />
        {/*<Feed />*/}
        <Feed topic={topic as string} />
      </div>
    </div>
  );
}

export default Subnewsposts;
