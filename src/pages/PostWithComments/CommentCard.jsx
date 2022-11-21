import style from './CommentCard.module.css';

export default function CommentCard({ body, author, createdAt }) {
  return (
    <div className={style.card}>
      <h3 className={style.author}>{author.username}</h3>
      <div
        className={style.body}
        // It's required to use `dangerouslySetInnerHTML` since
        // bodies of the posts are stored as HTML in order to keep markup
        dangerouslySetInnerHTML={{__html: body}}
      />
      <p className={style.date}>{(new Date(createdAt)).toDateString()}</p>
    </div>
  )
}
