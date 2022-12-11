import { useState } from 'react';
import { Outlet, useLoaderData } from "react-router-dom";
import getMe from '../../apis/blog/getMe.js';

import CurrentUserContext from '../../contexts/CurrentUserContext.js';

// Components 
import Header from './Header';

export default function Root() {
  const [currentUser, setCurrentUser] = useState(useLoaderData());

  return (
    // Pass both value and setter to the context to enable other components to
    // update the current user (i.e. log-in form)
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      <Header />
      <main className='page-content'>
        <Outlet />
      </main>
    </CurrentUserContext.Provider>
  )
}

// Get data about currentUser
export async function loader() {
  let user;
  try {
    user = await getMe();
  } catch(err) {
    // TODO: handle error properly
    console.error(err);
    user = null;
  }

  return user;
}
