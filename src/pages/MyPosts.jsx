import { getJWT } from '../storage/jwt';

import { useLoaderData } from "react-router-dom";

import PostList from '../components/PostList';

export default function Posts() {
  const myPosts = useLoaderData();
  return (
    <PostList posts={myPosts} />
  )
}

export async function loader() {
  const token = getJWT();
  if (!token) {
    return []
  }

  const response = await fetch('http://localhost:8000/posts/?author=me', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  const posts = await response.json();
  return posts;
}
