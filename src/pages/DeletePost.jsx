import { redirect } from 'react-router-dom';
import { deletePost } from '../apis/blog';

export async function action({params}) {
  try {
    await deletePost(params.postId);
  } catch(err) {
    // TODO: handle error properly
    console.error(err);
    return
  }

  return redirect('/posts')
}
