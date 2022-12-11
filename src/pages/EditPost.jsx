import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { getPost, savePost } from '../apis/blog';

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
  let post;
  try {
    post = await getPost(params.postId, {author: 'me'});
  } catch(err) {
    
    console.error(err);
  }

  return post;
}


export async function action({request, params}) {
  const editedPost = Object.fromEntries(await request.formData());

  let postFromResponse;
  try {
    postFromResponse = await savePost({
      ...editedPost,
      id: params.postId
    });
  } catch (err) {
    // TODO: handle error properly
    console.error(err);
    return;
  }

  // After editing post can change status to a private one (unpublished, archived)
  // In this case authorization is required
  return redirect(`/posts/${postFromResponse._id}?authorize=true`);
}
