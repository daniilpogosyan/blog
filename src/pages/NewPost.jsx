import { Form, redirect, useActionData } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { savePost } from '../apis/blog';

export default function NewPost() {
  const errors = useActionData();

  return (
    <div>
      <Form method="post">
        <div className="form-field">
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
        <button className="button primary">Create</button>
      </Form>
    </div>
  )
}


export async function action({request}) {
  const newPost = Object.fromEntries(await request.formData());

  let postFromResponse;
  try {
    postFromResponse = await savePost(newPost);
  } catch(err) {
    // TODO: handle error properly
    console.error(err);
    return;
  }

  // New posts are created with status 'unpublished'
  // In this case authorization is required 
  return redirect(`/posts/${postFromResponse._id}?authorize=true`);
}
