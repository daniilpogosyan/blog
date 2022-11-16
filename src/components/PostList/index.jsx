import PostCard from "./PostCard";
import style from './PostList.module.scss';

function excludeProps(obj, exclude) {
  if (!Array.isArray(exclude)) return obj

  const IncludeEntries = Object.entries(obj)
    .filter(([key, value]) => !exclude.includes(key));
    
  const fromIncluded = Object.fromEntries(IncludeEntries);
  return fromIncluded
}

export default function PostList({posts, excludedProps}) {
  
  return (
    <ul className={style['post-list']}>
      {
        posts.map((post) => (
          <li key={post.id} className={style['item']}>
            <PostCard {...excludeProps(post, excludedProps)} />
          </li>
        ))
      }
    </ul>
  )
}
