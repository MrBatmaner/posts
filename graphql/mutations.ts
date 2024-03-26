import { gql } from "@apollo/client";

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation($post_id: ID!, $username: String!, $text: String!) {
    insertComment(post_id: $post_id, username: $username, text: $text) {
      created_at
      id
      post_id
      text
      username
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutation($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      created_at
      post_id
      upvote
      username
    }
  }
`;

export const ADD_POST = gql`
  mutation MyMutation(
    $image: String!
    $body: String!
    $subnewsposts_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      image: $image
      body: $body
      subnewsposts_id: $subnewsposts_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      image
      subnewsposts_id
      title
      username
    }
  }
`;

export const ADD_SUBNEWSPOSTS = gql`
  mutation MyMutation($topic: String!) {
    insertSubnewsposts(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
