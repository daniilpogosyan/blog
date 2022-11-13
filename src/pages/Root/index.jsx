import { useState } from 'react';
import { Outlet, useLoaderData } from "react-router-dom";

import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import { getJWT } from  '../../storage/jwt';

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
  const token = getJWT();
  if (!token) {
    return null;
  }

  const response = await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/account/`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const user = response.status < 400 ? await response.json() : null
  return user;
}
