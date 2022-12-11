import { useLoaderData } from "react-router-dom";
import { getPosts } from "../apis/blog";

import PostList from '../components/PostList';

export default function Posts() {
  const posts = useLoaderData();
  return (
    <PostList posts={posts} excludedProps={['status']} />
  )
}

export async function loader() {
  const posts = await getPosts();
  return posts;
}
