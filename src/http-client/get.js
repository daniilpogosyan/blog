export default async function getRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    method: 'get'
  });

  return response;
}
