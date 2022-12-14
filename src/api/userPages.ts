import { AxiosResponse } from 'axios';
import { UserPage } from '../model/UserPage';
import { buildQueryString } from '../utils/url';
import instanceAxios from './httpConfig';

const getUserPages = async (userId: string, group?: number, page?: number): Promise<UserPage[]> => {
  const queryString = buildQueryString({ group, page });

  const response: AxiosResponse<UserPage[], undefined> = await instanceAxios.get(
    `/users/${userId}/pages${queryString}`
  );

  return response.data;
};

export default getUserPages;
