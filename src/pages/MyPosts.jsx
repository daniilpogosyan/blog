import { getJWT } from '../storage/jwt';

import { useLoaderData } from "react-router-dom";

import PostList from '../components/PostList';

export default function Posts() {
  const myPosts = useLoaderData();
  return (
    <PostList posts={myPosts} excludedProps={['author']} />
  )
}

export async function loader() {
  const token = getJWT();
  if (!token) {
    return []
  }

  const response = await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/posts/?author=me`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  const posts = await response.json();
  return posts;
}
