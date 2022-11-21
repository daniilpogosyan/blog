import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { getJWT } from '../storage/jwt';

import style from './EditPost.module.css';

export default function NewPost() {
  const errors = useActionData();
  const postData = useLoaderData();

  return (
    <div>
      <Form method="put" className={style['form']}>
        <div className="form-field">
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
          <Editor
              textareaName='body'
              apiKey='gy3e8g7jg729arbox9mtac6bd3zi1quvxdartjwolvpmednb'
              initialValue={postData.body}
              init={{
                height: 500,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code',  'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          <p>{errors?.body?.message}</p>
        </div>
        <fieldset>
          {
            ['unpublished', 'published', 'archived'].map((status) => (
              <div key={status}>
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
        
        <button className="button primary">Save</button>
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
