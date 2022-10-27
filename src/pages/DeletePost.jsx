import { redirect } from 'react-router-dom';
import { getJWT } from '../storage/jwt';

export async function action({params}) {
  const token = getJWT();

  if (!token) {
    return null;
  }

  await fetch(`http://localhost:8000/posts/${params.postId}`, {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });

  return redirect('/posts')
}
