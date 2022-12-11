import { login } from '../../apis/blog';
import { setJWT } from '../../storage/jwt';

export async function action({request}) {
  const formData = await request.formData();
  try {
    await login(formData.get('email'), formData.get('password'));
  } catch(err) {
    // TODO: handle error properly
    console.error(err);
  }
}
