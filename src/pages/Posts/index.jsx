import { useLoaderData } from "react-router-dom";

import PostCard from "./PostCard";

import style from "./Posts.module.css";

export default function Posts() {
  const posts = useLoaderData();
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

export async function loader() {
  const response = await fetch('http://localhost:8000/posts/');
  const posts = await response.json();
  return posts;
}
