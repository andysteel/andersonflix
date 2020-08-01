const URL_API = window.location.href.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://andersonflix.herokuapp.com';

export default {
  URL_API,
};
