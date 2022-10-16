import style from './CommentCard.module.css';

export default function CommentCard({ body, author, createdAt }) {
  return (
    <div className={style.card}>
      <h3 className={style.author}>{author.username}</h3>
      <p className={style.body}>{ body }</p>
      <p className={style.date}>{(new Date(createdAt)).toDateString()}</p>
    </div>
  )
}
