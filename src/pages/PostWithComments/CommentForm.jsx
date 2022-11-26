import { useEffect, useRef, useContext } from 'react';
import { useFetcher } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

import style from './CommentForm.module.css';
import CommentCard from './CommentCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function CommentForm({ comments }) {
  const fetcher = useFetcher();
  const formRef = useRef(null);
  const [currentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    // Reset form fields after submitting
    if (fetcher.state === 'idle') {
      formRef.current.reset();
    }

  }, [fetcher])

  return (
    <fetcher.Form ref={formRef} method="post" className={style['form']}>
      <CommentCard author={currentUser} createdAt={new Date()}>
        <Editor
          textareaName='body'
          apiKey='gy3e8g7jg729arbox9mtac6bd3zi1quvxdartjwolvpmednb'
          init={{
            menubar: false,
            placeholder: 'Type here...',
            min_height: 200,
            height: 200,
            plugins: [
              'advlist', 'autolink', 'lists', 'link',
              'table', 'code', 'wordcount'
            ],
            toolbar: 'bold italic | bullist numlist outdent indent',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      <button className="button primary">
        {fetcher.state === 'idle' ? 'Submit' : 'Submitting...'}
      </button>
      </CommentCard>
    </fetcher.Form>
  )
}
