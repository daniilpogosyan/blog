import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import UserBar from './UserBar';
import Hamburger from '../../components/Hamburger';

import style from './Header.module.css';

export default function Header() {
  const [currentUser] = useContext(CurrentUserContext);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  const toggleHamburger = () => setIsHamburgerOpen(!isHamburgerOpen);
  
  useEffect(() => {
    function handleMediaQueryChange(e) {
      if (e.matches) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    }

    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);


  return (
    <header className={style.header}>
      <h1 className={style['logo']}>
        <Link to='/' className={style.link}>
          BLOG
        </Link>
      </h1>
    
      {isSmallScreen && (
        <Hamburger
          isOpen={isHamburgerOpen}
          onClick={toggleHamburger}
        />
      )}
      <nav className={`${style['navbar']} ${isSmallScreen && !isHamburgerOpen ? style['collapsed'] : ''}`}>
        <ul className={style['links']}>
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
        <UserBar />
      </nav>
    </header>
  )
}