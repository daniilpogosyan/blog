import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import Post from './Post';
import ActionPanel from './ActionPanel';
import Comments from './Comments';
import CommentForm from './CommentForm';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import { getJWT } from '../../storage/jwt';

import style from './PostWithComments.module.css';

export default function PostWithComments() {
  const [currentUser] = useContext(CurrentUserContext);
  const { post, comments } = useLoaderData();

  return (
    <div>
      <Post {...post} />
      {/* Suggest to edit or delete post only to its author */}
      {post.author._id === currentUser?._id && <ActionPanel />}
      <h2>Comments: </h2>
      {!currentUser ? (
        <p className={style["no-form-message"]}>You must be logged in to post a comment.</p>
      ) : !currentUser.permissions.includes('write-post') ? (
        <p className={style["no-form-message"]}>You are not allowed to write posts</p>
      ) : (
        <CommentForm />
      )}
      <Comments comments={comments} />
    </div>
  )
}


// Generic function for getting json data from response
// It's required to request post and comments in parallel
async function fetchAndGetBody(resource, authRequired = false) {
  const fetchObj = {
    headers: {},
  }

  if (authRequired) {
    const token = getJWT();
    if (token === null) {
      return null
    }
    fetchObj.headers["Authorization"] = 'Bearer ' + token
  }

  const response = await fetch(resource, fetchObj);
  const data = await response.json();
  return data;
}

export async function loader({params, request}) {
  // parse query param to authorize
  const url = new URL(request.url);
  const authRequired = url.searchParams.get('authorize') === 'true';

  const postBaseUrl = `${process.env.REACT_APP_BLOG_API_BASEURL}/posts/${params.postId}`;
  const postUrl = postBaseUrl + (authRequired ? '?author=me' : '');
  const commentsUrl = `${process.env.REACT_APP_BLOG_API_BASEURL}/posts/${params.postId}/comments/?sort=-createdAt`;
  
  // get post and comments in parallel
  const [post, comments] = await Promise.all([
    fetchAndGetBody(postUrl, authRequired),
    fetchAndGetBody(commentsUrl)
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

 await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/posts/${params.postId}/comments`, {
    method: 'post',
    body: JSON.stringify(comment),
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });
}
