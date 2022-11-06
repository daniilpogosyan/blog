import { redirect } from 'react-router-dom';
import { getJWT } from '../storage/jwt';

export async function action({params}) {
  const token = getJWT();

  if (!token) {
    return null;
  }

  await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/posts/${params.postId}`, {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });

  return redirect('/posts')
}
