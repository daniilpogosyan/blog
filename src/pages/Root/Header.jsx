import { Link } from 'react-router-dom';

import style from './Header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <nav className={style.navs}>
        <h1>
          <Link to='/' className={style.link}>
            BLOG
          </Link>
        </h1>
        <ul className={style.links}>
          <li>
            <Link to='/posts' className={style.link}>
              Posts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}