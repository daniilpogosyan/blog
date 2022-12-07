export default async function putRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    method: 'put',
    headers: {
      ...(options.headers && headers),
      'Content-type': 'application/json'
    }
  });

  return response;
}
