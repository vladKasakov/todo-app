import { createSlice } from '@reduxjs/toolkit';

const initialState = 'dark';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => (state = state === 'dark' ? 'light' : 'dark'),
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
