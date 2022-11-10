import { useLoaderData } from 'react-router';

import Hero from "./Hero";
import PostList from '../../components/PostList';


export default function Home() {
  const posts = useLoaderData();
  return (
    <div>
      <Hero />
      <h1>Newest posts:</h1>
      <PostList
        posts={posts}
        excludedProps={['status']}
      />
    </div>
  )
}

export async function loader() {
  const response = await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/posts/?sort=-createdAt&limit=6`);
  const posts = await response.json();
  return posts;
}
