import { setJWT } from '../../storage/jwt';

export async function action({request}) {
  const formData = await request.formData()
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const response = await fetch('http://localhost:8000/account/login', {
    method: 'post',
    body: JSON.stringify(credentials),
    headers: {
      'Content-type': 'application/json'
    }
  });

  const token = await response.json();
  setJWT(token);
}
