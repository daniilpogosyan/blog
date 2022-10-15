import { Link } from 'react-router-dom';

import style from './PostCard.module.css';

export default function PostCard({ title, author, url }) {
  return (
    <div className={style.card}>
      <h2 className={style.heading}>{title}</h2>
      <p className={style.author}>by {author.username}</p>
      <Link to={url} className={style.link}>Read post</Link>
    </div>
  )
}
