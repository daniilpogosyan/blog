import { useContext } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

import Post from './Post';
import DeletePostForm from './DeletePostForm';
import Comments from './Comments';
import CommentForm from './CommentForm';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import { getJWT } from '../../storage/jwt';

export default function PostWithComments() {
  const [currentUser] = useContext(CurrentUserContext);
  const { post, comments } = useLoaderData();

  return (
    <div>
      {/* Suggest to edit or delete post only to its author */}
      {post.author._id === currentUser?._id && (
        <>
          <Link to='edit'>Edit</Link>
          <DeletePostForm />
        </>
      )}
      <Post {...post} />
      <Comments comments={comments} />
      {currentUser && <CommentForm />}
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

export async function action({params, request}) {
  const token = getJWT();
  if (!token) {
    return null
  }

  const formData = await request.formData();
  const comment = {
    body: formData.get('body')
  };

 await fetch(`http://localhost:8000/posts/${params.postId}/comments`, {
    method: 'post',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });
}
