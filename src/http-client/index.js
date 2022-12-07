import postRequest from './post';
import getRequest from './get';
import putRequest from './put';
import deleteRequest from './delete';

const httpClient = {
  post: postRequest,
  get: getRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default httpClient;
