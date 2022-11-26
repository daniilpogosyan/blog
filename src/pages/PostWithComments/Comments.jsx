import CommentCard from './CommentCard';

import style from './Comments.module.css';

export default function Comments({ comments }) {
  return (
    <ul className={style['comment-list']}>
      {
        Array.isArray(comments) && comments.map(comment => (
          <li key={comment._id}>
            <CommentCard {...comment} />
          </li>
        ))
      }
    </ul>
  )
}