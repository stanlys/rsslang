import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getUserPages from '../../api/userPages';
import { UserPage } from '../../model/UserPage';

export interface DictionaryState {
  userPages: UserPage[];
}

const initialState: DictionaryState = {
  userPages: [],
};

export const fetchUserPages = createAsyncThunk(
  'dictionary/getUserPages',
  async (userId: string): Promise<UserPage[]> => {
    return getUserPages(userId);
  }
);

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPages.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.userPages = action.payload;
    });
  },
});

export default dictionarySlice.reducer;
