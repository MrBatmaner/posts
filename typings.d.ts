type Comments = {
  created_at: string;
  id: number;
  post_id: number;
  text: string;
  username: string;
};

type Vote = {
  created_at: string;
  id: number;
  post_id: number;
  upvote: boolean;
  username: string;
};

type Subnewsposts = {
  created_at: string;
  id: number;
  topic: string;
};

type Post = {
  body: string;
  created_at: string;
  id: number;
  image: string;
  subnewsposts_id: number;
  title: string;
  username: string;
  votes: Vote[];
  comments: Comments[];
  subnewsposts: Subnewspost[];
};
