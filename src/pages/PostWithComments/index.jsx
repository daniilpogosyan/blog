import { useLoaderData } from 'react-router-dom';

import Post from './Post';
import Comments from './Comments';

export default function PostWithComments() {
  const { post, comments } = useLoaderData();
  return (
    <div>
      <Post {...post} />
      <Comments comments={comments} />
    </div>
  )
}


// Generic function for getting json data from response
// It's required to request post and comments in parallel
async function fetchAndGetBody(resource) {
 const response = await fetch(resource);
 const data = await response.json();
 return data;
}

export async function loader({params}) {
  // get post and comments in parallel
  const [post, comments] = await Promise.all([
    fetchAndGetBody(`http://localhost:8000/posts/${params.postId}`),
    fetchAndGetBody(`http://localhost:8000/posts/${params.postId}/comments`)
  ]);
  return { post, comments };
}
