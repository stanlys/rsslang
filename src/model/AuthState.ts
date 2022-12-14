import store from '../store/store';

export interface AuthState {
  id: string;
  name: string;
  email: string;
  message: string;
  password: string;
  token: string;
  refreshToken: string;
  authorizeStatus: boolean;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
