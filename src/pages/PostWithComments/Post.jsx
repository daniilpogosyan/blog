import style from './Post.module.css';

export default function Post({ title, body }) {
  return (
    <div>
      <h1 className={style.heading}>{title}</h1>
      <p className={style.body}>{body}</p>
    </div>
  )
}