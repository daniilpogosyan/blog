import { Form, redirect, useActionData } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
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
          <Editor
            textareaName='body'
            apiKey='gy3e8g7jg729arbox9mtac6bd3zi1quvxdartjwolvpmednb'
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

  const response = await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/posts`, {
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
