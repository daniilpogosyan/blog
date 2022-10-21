import { useContext, useEffect } from 'react';
import { useFetcher, Link  } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getJWT } from '../../storage/jwt';

import LogoutButton from './LogoutButton';

export default function UserBar() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const fetcher = useFetcher();
  

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

  if (currentUser) {
    return (
      <div>
        <p>{currentUser.username}</p>
        <LogoutButton />
      </div>
    )
  }

  return (
    <div>
      <fetcher.Form action="/login" method="post">
        <label htmlFor="login-email">Email:</label>
        <input
          id="login-email"
          type="email"
          placeholder="youremail@somemail.com"
          name="email"
        />
        <label htmlFor="login-password">Password:</label>
        <input
          id="login-password"
          type="password"
          placeholder="Password"
          name="password"
        />
        <button>Log in</button>
      </fetcher.Form>
      <Link to='/signup'>Sign up</Link>
    </div>
  );
}
