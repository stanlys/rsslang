import axios from 'axios';
import { AuthState } from '../model/AuthState';
import { removeItemFromLocalStorage, getUserFromLocalStorage } from '../utils/localStorage';
import API_BASE_URL from './constants';

const instanceAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

instanceAxios.interceptors.request.use((config) => {
  try {
    if (localStorage.getItem('Auth') !== null) {
      const loggedUser = getUserFromLocalStorage<AuthState>('Auth') || '';
      if (config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${loggedUser.token}`;
      }
    }
    // eslint-disable-next-line no-empty
  } catch {}
  return config;
});

instanceAxios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.response.status === 401) {
      removeItemFromLocalStorage('Auth');
    } else {
      throw error;
    }
  }
);

export default instanceAxios;
