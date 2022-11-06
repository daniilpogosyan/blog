import { Link } from 'react-router-dom';

import style from './PostCard.module.css';

export default function PostCard({ title, author, id, status }) {
  const statusTagClassName = `${style['status-tag']} ${style[status]}`;
  const linkUrl = status === 'published' ? `/posts/${id}` : `/posts/${id}/?authorize=true`;
  return (
    <div className={style.card}>
      <h2 className={style.heading}>{title}</h2>
      <p className={style.author}>by {author.username}</p>
      <Link to={linkUrl} className={style.link}>Read post</Link>
      <div className={statusTagClassName}>
        {status}
      </div>
    </div>
  )
}
