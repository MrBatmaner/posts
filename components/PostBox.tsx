import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { GET_ALL_POSTS, GET_SUBNEWSPOSTS_BY_TOPIC } from "@/graphql/queries";
import client from "../apollo-client";
import { ADD_POST, ADD_SUBNEWSPOSTS } from "@/graphql/mutations";
import toast from "react-hot-toast";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subnewsposts: string;
};

type Props = {
  subnewsposts?: string;
};

function PostBox({ subnewsposts }: Props) {
  const { data: session } = useSession();
  // useMutation gives us a function to execute from addPost
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  });
  const [addSubnewsposts] = useMutation(ADD_SUBNEWSPOSTS);

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading("Creating new post...");

    try {
      // Query for the subnewsposts topic
      const {
        data: { getSubnewspostsListByTopic },
      } = await client.query({
        query: GET_SUBNEWSPOSTS_BY_TOPIC,
        variables: {
          // Use props first, fallback to form
          topic: subnewsposts || formData.subnewsposts,
        },
      });

      const subnewspostsExists = getSubnewspostsListByTopic.length > 0;

      //console.log(
      //"Subnewsposts found with topic",
      //formData.subnewsposts,
      //getSubnewspostsListByTopic
      //);

      if (!subnewspostsExists) {
        // create subnewsposts
        // subnewsposts which we ve created we need to get subnewsposts ID that we can then add a post with
        console.log("Subpost is new! -> creating a NEW subpost!");

        const {
          data: { insertSubnewsposts: newSubnewsposts },
        } = await addSubnewsposts({
          variables: {
            topic: formData.subnewsposts,
          },
        });

        console.log("Creating post...", formData);
        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            image: image,
            body: formData.postBody,
            subnewsposts_id: newSubnewsposts.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
        console.log("New post added:", newPost);
      } else {
        // use existing subnewsposts
        console.log("Using existing subpost!");
        console.log(getSubnewspostsListByTopic);

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            image: image,
            body: formData.postBody,
            subnewsposts_id: getSubnewspostsListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("new post added:", newPost);
      }

      // After the post has been added!
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("postTitle", "");
      setValue("subnewsposts", "");

      toast.success("New Post Created!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
    }
  });

  //console.log(subnewsposts);

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-20 z-50 rounded-md border bg-orange-50 border-orange-300"
    >
      <div className="text-black flex items-center space-x-3">
        {/* Avatar */}
        <Avatar />

        <input
          //a way we connect import to the special form is
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="bg-orange-50 p-2 pl-5 outline-none flex-1 rounded-md"
          type="text"
          placeholder={
            session
              ? subnewsposts
                ? `Create a post in r/${subnewsposts}`
                : "Create a post by entering a title!"
              : "Sign in to post"
          }
        />

        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && "text-orange-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/*Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px] text-black">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 text-black outline-none"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {!subnewsposts && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px] text-black">Subposts:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 text-black outline-none"
                {...register("subnewsposts", { required: true })}
                type="text"
                placeholder="i.e. Reactjs"
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px] text-black">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 text-black outline-none"
                {...register("subnewsposts")}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {/* Errors*/}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- A Post Title is required</p>
              )}
              {errors.subnewsposts?.type === "required" && (
                <p>- A Post Title is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className=" w-full rounded-full bg-blue-400 p-2 text-black"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
