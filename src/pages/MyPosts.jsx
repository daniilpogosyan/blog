import { getPosts } from '../apis/blog';
import { useLoaderData } from "react-router-dom";

import PostList from '../components/PostList';

export default function Posts() {
  const myPosts = useLoaderData();
  return (
    <PostList posts={myPosts} excludedProps={['author']} />
  )
}

export async function loader() {
  const posts = await getPosts({author: 'me'});
  return posts;
}
