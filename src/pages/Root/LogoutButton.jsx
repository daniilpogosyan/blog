import { useContext } from 'react';
import { removeJWT } from '../../storage/jwt';

import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function LogoutButton() {
  const [, setCurrentUser] = useContext(CurrentUserContext);

  function logout() {
    setCurrentUser(null);
    removeJWT();
  }

  return (
    <button
      onClick={logout}
      className="button danger outline"
    >
      Log out
    </button>
  )
}
