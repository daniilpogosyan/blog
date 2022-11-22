import { useContext, useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import { getJWT } from '../../storage/jwt';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import style from './LoginForm.module.css';

export default function LoginForm() {
  const [, setCurrentUser] = useContext(CurrentUserContext);
  const fetcher = useFetcher();

  useEffect(() => {
    // fetcher.state is 'loading' when fetcher action is done
    if (fetcher.state === 'loading') {
      const token = getJWT();
      if (!token) {
        return null;
      }

      fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/account/`, {
        method: 'get',
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        const user = response.status < 400 ? response.json() : null;
        return user;        
      })
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error(err));
    }
    // setCurrentUser does not have to be included in the dependency array,
    // since it does not change
    // eslint-disable-next-line
  }, [fetcher]);
  
  return (
    <fetcher.Form action="/login" method="post" className={style.form}>
      <div className="form-field">
        <label htmlFor="login-email">Email:</label>
        <input
          id="login-email"
          type="email"
          placeholder="youremail@somemail.com"
          name="email"
        />
      </div>
      <div className="form-field">
        <label htmlFor="login-password">Password:</label>
        <input
          id="login-password"
          type="password"
          placeholder="Password"
          name="password"
        />
      </div>
      <button className='button primary outline'>Log in</button>
    </fetcher.Form>
  )
}
