import { useLoaderData } from 'react-router';

import Hero from "./Hero";
import PostList from '../../components/PostList';
import { getPosts } from '../../apis/blog';


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
  const posts = await getPosts({
    sort: '-createdAt',
    limit: '6'
  });
  return posts;
}
