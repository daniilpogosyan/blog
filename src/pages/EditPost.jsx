import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { getJWT } from '../storage/jwt';

export default function NewPost() {
  const errors = useActionData();
  const postData = useLoaderData();

  return (
    <div>
      <Form method="put">
        <div>
          <label htmlFor="post-title">Title:</label>
          <input
            id="post-title"
            type="text"
            name="title"
            defaultValue={postData.title}
          />
          <p>{errors?.title?.message}</p>
        </div>
        <div>
          <label htmlFor="post-body">Body:</label>
          <textarea
            name="body"
            id="post-body"
            cols="30"
            rows="10"
            defaultValue={postData.body}
          >
          </textarea>
          <p>{errors?.body?.message}</p>
        </div>
        <fieldset>
          {
            ['unpublished', 'published', 'archived'].map((status) => (
              <div>
                <label htmlFor={`post-status-${status}`}>{status}</label>
                <input
                  id={`post-status-${status}`}
                  type="radio"
                  name="status"
                  value={status}
                  defaultChecked={postData.status === status}
                />
              </div>
            ))
          }
        </fieldset>
        
        <button>Save</button>
      </Form>
    </div>
  )
}


export async function loader({params}) {
  // postId is not provided
  if (!params.postId) {
    return redirect('/');
  }

  const token = getJWT();
  if (!token) {
    return null
  }

  const response = await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/posts/${params.postId}/?author=me`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  });
  const postData = await response.json();
  return postData;
}


export async function action({request, params}) {
  const token = getJWT();
  if (!token) {
    return null;
  }

  const editedPost = Object.fromEntries(await request.formData());

  const response = await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/posts/${params.postId}`, {
    method: 'put',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(editedPost)
  });

  // Inform user of invalid input
  if (response.status >= 400) {
    return (await response.json()).errors;
  }
  
  return redirect('/');
}
