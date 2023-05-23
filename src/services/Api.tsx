import axios from 'axios';

const Axios = axios.create({
  baseURL: "",
  timeout: 2000000,
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export { Axios };