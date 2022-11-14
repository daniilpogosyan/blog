import style from './Post.module.css';

export default function Post({ title, body }) {
  return (
    <div>
      <h1 className={style.heading}>{title}</h1>
      <div
        className={style.body}
        // It's required to use `dangerouslySetInnerHTML` since
        // bodies of the posts are stored as HTML in order to keep markup
        dangerouslySetInnerHTML={{__html: body}}
      />
    </div>
  )
}