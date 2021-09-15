import axios from 'axios';

import {Constants} from 'globals';

export const initAxios = () => {
  axios.defaults.baseURL = Constants.apiBaseUrl;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common.Accept = 'application/json';
};
