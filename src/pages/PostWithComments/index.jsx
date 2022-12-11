import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import Post from './Post';
import ActionPanel from './ActionPanel';
import Comments from './Comments';
import CommentForm from './CommentForm';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getComments, getPost, saveComment } from '../../apis/blog';

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

export async function loader({params, request}) {
  // parse query param to authorize
  const url = new URL(request.url);
  const authRequired = url.searchParams.get('authorize') === 'true';

  const requestForPost = authRequired
  ? getPost(params.postId, { author: 'me' })
  : getPost(params.postId);

  
  // TODO: handle error properly
  const [post, comments] = await Promise.all([
    requestForPost,
    getComments(params.postId, {sort: '-createdAt'})
  ]);

  return { post, comments };
}

export async function action({params, request}) {
  const formData = await request.formData();
  const comment = {
    body: formData.get('body')
  };
  try {
    await saveComment({ ...comment, post: params.postId });
  } catch(err) {
    // TODO: handle error properly
    console.error(err);
  }
}
