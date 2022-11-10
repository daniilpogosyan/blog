import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Root, {
  loader as rootLoader
} from './pages/Root';

import Home from './pages/Home';
import {
  action as loginAction
} from './pages/Login';

import SignUp, {
  action as signupAction
} from './pages/SignUp';

import NewPost, {
  action as newPostAction
} from './pages/NewPost';

import EditPost, {
  action as editPostAction,
  loader as editPostLoader
} from './pages/EditPost';

import {
  action as deletePostAction
} from './pages/DeletePost';

import PostWithComments, {
  loader as postLoader,
  action as postAction
} from './pages/PostWithComments';

import Posts, {
  loader as postsLoader
} from './pages/Posts';

import MyPosts, {
  loader as myPostsLoader
} from './pages/MyPosts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />
      },
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
        path: 'myposts',
        element: <MyPosts />,
        loader: myPostsLoader
      },
      {
        path: 'posts/:postId',
        element: <PostWithComments />,
        loader: postLoader,
        action: postAction
      },
      {
        path: 'posts/:postId/edit',
        element: <EditPost />,
        loader: editPostLoader,
        action: editPostAction
      },
      {
        path: 'posts/:postId/delete',
        action: deletePostAction
      },
      {
        path: 'newpost',
        element: <NewPost />,
        action: newPostAction,
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
