import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom';

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
    <fetcher.Form ref={formRef} method="post">
      <label htmlFor="new-comment-input">Your comment:</label>
      <textarea name="body" id="new-comment-input" cols="30" rows="10"></textarea>
      <button>{fetcher.state === 'idle' ? 'Submit' : 'Submitting...'}</button>
    </fetcher.Form>
  )
}
