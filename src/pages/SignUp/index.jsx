import { Form, redirect } from 'react-router-dom';

import style from './SignUp.module.css';

export default function SignUp() {

  return (
    <div className={style['container']}>
      <div className={style['form']}>
        <h1>Sign up</h1>
        <Form method="post" >
          <div className="form-field">
            <label htmlFor="login-username">Username:</label>
            <input
              id="login-username"
              type="text"
              placeholder="YourCoolUsername"
              name="username"
            />
          </div>
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
          <button className={style['submit-button']}>Sign up</button>
        </Form>
      </div>
    </div>
  )
}

export async function action({request}) {
  const userData = Object.fromEntries(await request.formData());
  const response = await fetch(`${process.env.REACT_APP_BLOG_API_BASEURL}/account/signup`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (response.status < 400)
    return redirect('/');
}
