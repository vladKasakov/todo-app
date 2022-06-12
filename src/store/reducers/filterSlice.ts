import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveField } from '../../models';

const initialState = 'all' as ActiveField;

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveField: (state, action: PayloadAction<ActiveField>) =>
      (state = action.payload),
  },
});

export const { setActiveField } = filterSlice.actions;

export default filterSlice.reducer;
