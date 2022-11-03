import PostCard from "./PostCard";
import style from './PostList.module.css';

export default function PostList({posts}) {
  return (
    <ul className={style['post-list']}>
      {
        posts.map((post) => (
          <li key={post.id}>
            <PostCard {...post} />
          </li>
        ))
      }
    </ul>
  )
}
