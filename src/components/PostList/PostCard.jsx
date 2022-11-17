import { Link } from 'react-router-dom';

import style from './PostCard.module.css';

export default function PostCard({ title, author, id, status, createdAt }) {
  const statusTagClassName = `${style['status-tag']} ${style[status]}`;
  // If the post is published, then authorization is not required.
  // If the post status is undefined, then the post is assumed to be published.
  const linkUrl = (status === 'published' || status == undefined)
     ? `/posts/${id}` : `/posts/${id}/?authorize=true`;
  return (
    <div className={style.card}>
      <h2 className={style.heading}>{title}</h2>
      {author && (
        <p className={style.author}>by {author.username}</p>
      )}
      <Link to={linkUrl} className={style.link}>Read post</Link>
      {status && (
        <div className={statusTagClassName}>
          {status}
        </div>
      )}
      <span className={style['date']}>{(new Date(createdAt)).toDateString()}</span>
    </div>
  )
}
