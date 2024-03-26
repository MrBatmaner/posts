import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "@/graphql/queries";

import React from "react";
import Post from "./Post";

type Props = {
  topic?: string;
};

function Feed({ topic }: Props) {
  const { data, error } = !topic
    ? /*eslint-disable */
      useQuery(GET_ALL_POSTS)
    : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic: topic,
        },
      });
  //const { data, error } = useQuery(
  //!topic ? GET_ALL_POSTS : GET_ALL_POSTS_BY_TOPIC,
  //: useQuery(GET_ALL_POSTS);

  const posts: Post[] = !topic ? data?.postList : data?.getpostListByTopic;

  console.log(posts);

  //const posts: Post[] = data?.getpostListByTopic;

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
