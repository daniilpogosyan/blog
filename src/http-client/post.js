export default async function postRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    method: 'post',
    headers: {
      ...(options.headers && headers),
      'Content-type': 'application/json'
    }
  });

  return response;
}
