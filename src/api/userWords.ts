import { AxiosResponse } from 'axios';
import instanceAxios from './httpConfig';
import { UserWord, NewUserWord, UpdatedUserWord } from '../model/UserWord';

export const getUserWords = async (userId: string): Promise<UserWord[]> => {
  const response: AxiosResponse<UserWord[], undefined> = await instanceAxios.get(
    `/users/${userId}/words`
  );

  return response.data;
};

export const getUserWord = async (userId: string, wordId: string): Promise<UserWord> => {
  const response: AxiosResponse<UserWord, undefined> = await instanceAxios.get(
    `/users/${userId}/words/${wordId}`
  );

  return response.data;
};

export const createUserWord = async (
  userId: string,
  wordId: string,
  newWord: NewUserWord
): Promise<UserWord> => {
  const response: AxiosResponse<UserWord, NewUserWord> = await instanceAxios.post(
    `/users/${userId}/words/${wordId}`,
    newWord
  );

  return response.data;
};

export const updateUserWord = async (
  userId: string,
  wordId: string,
  updatedWord: UpdatedUserWord
): Promise<UserWord> => {
  const response: AxiosResponse<UserWord, UpdatedUserWord> = await instanceAxios.put(
    `/users/${userId}/words/${wordId}`,
    updatedWord
  );

  return response.data;
};
