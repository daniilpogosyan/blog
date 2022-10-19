import { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function UserBar() {
  const [currentUser, ] = useContext(CurrentUserContext);
  

  if (currentUser) {
    return (
      <div>
        <p>{currentUser.username}</p>
      </div>
    )
  }

  return null;
}