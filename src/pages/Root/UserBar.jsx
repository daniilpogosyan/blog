import { useContext, useEffect, useState } from 'react';
import { useFetcher, Link  } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getJWT } from '../../storage/jwt';

import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import style from './UserBar.module.css';

export default function UserBar() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [isToggled, setIsToggled] = useState(false);

  const fetcher = useFetcher();
  
  function toggleDropdown() {
    setIsToggled(isToggled ? false : true);
  }

  useEffect(() => {
    // fetcher.state is 'loading' when fetcher action is done
    if (fetcher.state === 'loading') {
      const token = getJWT();
      if (!token) {
        return null;
      }

      fetch('http://localhost:8000/account/', {
        method: 'get',
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => response.json())
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error(err));
    }
    // setCurrentUser does not have to be included in the dependency array,
    // since it does not change
    // eslint-disable-next-line
  }, [fetcher]);

  return (
    <div>
      {currentUser
      ? (
        <button
          onClick={toggleDropdown}
          className={style.link}
        >
          {currentUser.username}
        </button>
      ) : (
        <>
          <button
            onClick={toggleDropdown}
            className={style.link}
          >
            Log in
          </button>
          <Link
            className={style.link}
            to='/signup'
          >
            Sign up
          </Link>
        </>
      )}
      
      <div className={style["dropdown-container"]}>
        <div className={`${style.dropdown} ${isToggled ? style.toggled: ''}`}>
          {currentUser
          ? (
            <>
              {currentUser?.permissions?.includes('write-post') &&
                <Link to='/newpost' className={style['dropdown-option']}>New post</Link>
              }
              <Link to='/myposts' className={style['dropdown-option']}>My posts</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <LoginForm />
              <p className={style.subtext}>
                Don't have an account? <Link to='/signup'>Create one now.</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
