import { useLoaderData } from "react-router-dom";

import PostList from '../components/PostList';

export default function Posts() {
  const posts = useLoaderData();
  return (
    <PostList posts={posts} />
  )
}

export async function loader() {
  const response = await fetch('http://localhost:8000/posts/');
  const posts = await response.json();
  return posts;
}
