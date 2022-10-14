import { Outlet } from "react-router-dom";

// Components 
import Header from './Header';

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
