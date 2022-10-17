import { useState } from 'react';
import { Outlet, useLoaderData } from "react-router-dom";

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
      <Outlet />
    </CurrentUserContext.Provider>
  )
}


export async function loader() {
  // hardcoded mock user since authentication is not implemented yet
  return {
    username: 'HARDCODED USERNAME'
  }
}