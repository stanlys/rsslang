import { AxiosResponse } from 'axios';
import Auth from '../model/Auth';
import { User, UserResponse, UserDeleted, UserSetting, UserUpdateData } from '../model/User';
import instanceAxios from './httpConfig';

export const createUser = async (creatingUser: User): Promise<UserResponse> => {
  const response: AxiosResponse<UserResponse, undefined> = await instanceAxios.post(
    `/users`,
    creatingUser
  );
  return response.data;
};

export const signIn = async (creatingUser: User): Promise<Auth> => {
  const response: AxiosResponse<Auth, undefined> = await instanceAxios.post(
    `/signin`,
    creatingUser
  );
  return response.data;
};

export const getUser = async (userId: string): Promise<UserResponse> => {
  const response: AxiosResponse<UserResponse, undefined> = await instanceAxios.get(
    `/users/${userId}`
  );
  return response.data;
};

export const updateUser = async (userId: string, updateUserData: UserUpdateData): Promise<User> => {
  const response: AxiosResponse<User, undefined> = await instanceAxios.put(
    `/users/${userId}`,
    updateUserData
  );
  return response.data;
};

export const deleteUser = async (userId: string): Promise<UserDeleted> => {
  const response: AxiosResponse<number, undefined> = await instanceAxios.delete(`/users/${userId}`);
  return { id: userId, responseStatus: response.status };
};

export const getNewUserToken = async (userId: string): Promise<UserResponse> => {
  const response: AxiosResponse<UserResponse, undefined> = await instanceAxios.get(
    `/users/${userId}/tokens`
  );
  return response.data;
};
