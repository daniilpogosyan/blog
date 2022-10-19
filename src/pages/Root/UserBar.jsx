import { useContext } from 'react';
import { useFetcher } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function UserBar() {
  const [currentUser, ] = useContext(CurrentUserContext);
  const fetcher = useFetcher();
  

  if (currentUser) {
    return (
      <div>
        <p>{currentUser.username}</p>
      </div>
    )
  }

  return (
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
  );
}
