import axios, { AxiosResponse } from 'axios';
import Word from '../model/Word';
import { buildQueryString } from '../utils/url';
import API_BASE_URL from './constants';

const wordsEndpoint = `${API_BASE_URL}/words`;

export const getWords = async (group?: number, page?: number): Promise<Word[]> => {
  const queryString = buildQueryString({ group, page });

  const response: AxiosResponse<Word[], undefined> = await axios.get(
    `${wordsEndpoint}${queryString}`
  );

  return response.data;
};

export const getWord = async (id: string): Promise<Word> => {
  const response: AxiosResponse<Word, undefined> = await axios.get(`${wordsEndpoint}/${id}`);

  return response.data;
};
