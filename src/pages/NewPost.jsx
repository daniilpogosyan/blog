import { Form, redirect } from 'react-router-dom';
import { getJWT } from '../storage/jwt';

export default function NewPost() {

  return (
    <div>
      <Form method="post">
        <label htmlFor="new-post-title">Title:</label>
        <input id="new-post-title" type="text" name="title"/>
        <label htmlFor="new-post-body">Body:</label>
        <textarea name="body" id="new-post-body" cols="30" rows="10"></textarea>
        <button>Create</button>
      </Form>
    </div>
  )
}


export async function action({request}) {
  const token = getJWT();
  if (!token) {
    return null;
  }

  const newPost = Object.fromEntries(await request.formData());

  await fetch('http://localhost:8000/posts', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newPost)
  });

  return redirect('/');
}
