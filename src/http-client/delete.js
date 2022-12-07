export default async function deleteRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    method: 'delete'
  });

  return response;
}