import { Form, redirect, useActionData } from 'react-router-dom';
import { getJWT } from '../storage/jwt';

export default function NewPost() {
  const errors = useActionData();

  return (
    <div>
      <Form method="post">
        <div>
          <label htmlFor="new-post-title">Title:</label>
          <input id="new-post-title" type="text" name="title"/>
          <p>{errors?.title?.message}</p>
        </div>
        <div>
          <label htmlFor="new-post-body">Body:</label>
          <textarea name="body" id="new-post-body" cols="30" rows="10"></textarea>
          <p>{errors?.body?.message}</p>
        </div>
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

  const response = await fetch('http://localhost:8000/posts', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newPost)
  });

  if (response.status >= 400) {
    return (await response.json()).errors;
  }
  
  return redirect('/');
}
