import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../model/AuthState';
import { removeItemFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

/* eslint-disable no-param-reassign */
export type UpdatedUserInfo = {
  password: string;
  email: string;
};

const initialAuth: AuthState = {
  id: '',
  name: '',
  email: '',
  token: '',
  message: '',
  password: '',
  refreshToken: '',
  authorizeStatus: false,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState: initialAuth,
  reducers: {
    createUserData: (state, { payload }: PayloadAction<AuthState>) => {
      saveToLocalStorage(payload, 'Auth');
      return payload;
    },
    setAuthorizeUser: (state, { payload }: PayloadAction<AuthState>) => {
      saveToLocalStorage(payload, 'Auth');
      return payload;
    },
    deleteUserData: (state) => {
      removeItemFromLocalStorage('Auth');
      return initialAuth;
    },
    updateUserData: (state, { payload }: PayloadAction<UpdatedUserInfo>) => {
      state.password = payload.password;
      state.email = payload.email;
      saveToLocalStorage(state, 'Auth');
    },
  },
});

export default authSlice;
export const { createUserData, deleteUserData, updateUserData, setAuthorizeUser } =
  authSlice.actions;
