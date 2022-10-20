import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Root, {
  loader as rootLoader
} from './pages/Root';

import {
  action as loginAction
} from './pages/Login';

import SignUp, {
  action as signupAction
} from './pages/SignUp';

import PostWithComments, {
  loader as postLoader
} from './pages/PostWithComments';

import Posts, {
  loader as postsLoader
} from './pages/Posts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: 'login',
        action: loginAction
      },
      {
        path: 'signup',
        element: <SignUp />,
        action: signupAction
      },
      {
        path: 'posts',
        element: <Posts />,
        loader: postsLoader
      },
      {
        path: 'posts/:postId',
        element: <PostWithComments />,
        loader: postLoader
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
