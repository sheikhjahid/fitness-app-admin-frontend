/* eslint-disable no-return-assign */

import Axios from 'axios';

export const api = Axios.create({
  baseURL: '',
  //   headers: {
  //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  //   }
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default api;
