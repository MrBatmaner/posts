import Feed from "@/components/Feed";
import Header from "@/components/Header";
import PostBox from "@/components/PostBox";
import SubnewspostsRow from "@/components/SubnewspostsRow";
import { GET_SUBNEWSPOSTS_WITH_LIMIT } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import Head from "next/head";

type Props = {
  subnewsposts: string;
};

// get data from database to our frontend
const Home = () => {
  const { data } = useQuery(GET_SUBNEWSPOSTS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });

  const subnewsposts: Subnewsposts[] = data?.getSubnewspostsListLimit;

  return (
    <div className="my-7 mx-auto max-w-5xl ">
      <Head>
        <title>Posts</title>
      </Head>

      {/* PostBox */}

      <PostBox />

      <div className="flex">
        <Feed />

        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold text-black">
            Top Communities
          </p>
          <div>
            {subnewsposts?.map((subnewsposts, i) => (
              <SubnewspostsRow
                key={subnewsposts.id}
                topic={subnewsposts.topic}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
