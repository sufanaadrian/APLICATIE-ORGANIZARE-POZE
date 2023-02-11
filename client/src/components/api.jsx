// api.js
import { setPosts } from "state";

export const getPosts = async (dispatch, token) => {
  const response = await fetch(`http://localhost:3001/posts?isSharable=true`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  dispatch(setPosts({ posts: data }));
};

export const getUserPosts = async (dispatch, token, userId) => {
  const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();

  dispatch(setPosts({ posts: data }));
};
