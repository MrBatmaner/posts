import { gql } from "@apollo/client";
// ! means required property

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getpostlistByPostId(post_id: $post_id) {
      body
      comments {
        created_at
        id
        post_id
        text
        username
      }
      created_at
      id
      image
      subnewsposts {
        created_at
        id
        topic
      }
      title
      subnewsposts_id
      username
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query MyQuery {
    postList {
      body
      created_at
      id
      image
      title
      subnewsposts_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subnewsposts {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getpostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      title
      subnewsposts_id
      username
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subnewsposts {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_SUBNEWSPOSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubnewspostsListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_SUBNEWSPOSTS_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubnewspostsListLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`;
