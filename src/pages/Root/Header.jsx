import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import UserBar from './UserBar';

import style from './Header.module.css';

export default function Header() {
  const [currentUser] = useContext(CurrentUserContext);

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
          {currentUser?.permissions?.includes('write-post') && (
            <li>
              <Link to="/newpost" className={style.link}>
                New post
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div>
        <UserBar />
      </div>
    </header>
  )
}