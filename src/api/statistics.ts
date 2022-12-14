import { AxiosResponse } from 'axios';
import { NewStatistic, Statistic } from '../model/Statistics';
import { buildQueryString } from '../utils/url';
import instanceAxios from './httpConfig';

export const getStatistics = async (userId: string, date?: Date): Promise<Statistic[]> => {
  const queryString = buildQueryString({ date: date?.toISOString() });

  const response: AxiosResponse<Statistic[], undefined> = await instanceAxios.get(
    `/users/${userId}/statistics${queryString}`
  );

  return response.data;
};

export const getStatistic = async (userId: string, statId: string): Promise<Statistic> => {
  const response: AxiosResponse<Statistic, undefined> = await instanceAxios.get(
    `/users/${userId}/statistics/${statId}`
  );

  return response.data;
};

export const createStatistic = async (
  userId: string,
  newStatistic: NewStatistic
): Promise<Statistic> => {
  const response: AxiosResponse<Statistic, NewStatistic> = await instanceAxios.post(
    `/users/${userId}/statistics`,
    newStatistic
  );

  return response.data;
};

export const updateStatistic = async (
  userId: string,
  statId: string,
  updatedStatistic: NewStatistic
): Promise<Statistic> => {
  const response: AxiosResponse<Statistic, NewStatistic> = await instanceAxios.put(
    `/users/${userId}/statistics/${statId}`,
    updatedStatistic
  );
  return response.data;
};
