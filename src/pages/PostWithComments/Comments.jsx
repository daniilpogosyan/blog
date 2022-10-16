import CommentCard from './CommentCard';

import style from './Comments.module.css';

export default function Comments({ comments }) {
  return (
    <div>
      <h2>Comments: </h2>
      <ul className={style['comment-list']}>
        {
          Array.isArray(comments) && comments.map(comment => (
            <li key={comment.id}>
              <CommentCard {...comment} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}