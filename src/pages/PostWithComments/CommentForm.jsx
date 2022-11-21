import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import style from './CommentForm.module.css';

export default function CommentForm({ comments }) {
  const fetcher = useFetcher();
  const formRef = useRef(null);

  useEffect(() => {
    // Reset form fields after submitting
    if (fetcher.state === 'idle') {
      formRef.current.reset();
    }

  }, [fetcher])

  return (
    <fetcher.Form ref={formRef} method="post" className={style['form']}>
      <label htmlFor="new-comment-input">Your comment:</label>
      <Editor
        textareaName='body'
        apiKey='gy3e8g7jg729arbox9mtac6bd3zi1quvxdartjwolvpmednb'
        init={{
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link',
            'table', 'code', 'wordcount'
          ],
          toolbar: 'bold italic | bullist numlist outdent indent',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button>{fetcher.state === 'idle' ? 'Submit' : 'Submitting...'}</button>
    </fetcher.Form>
  )
}
